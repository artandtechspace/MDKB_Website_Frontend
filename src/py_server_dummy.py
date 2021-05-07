import asyncio
import websockets
import time 

async def handler(websocket, path):
    consumer_task = asyncio.ensure_future(consumer_handler(websocket, path))
    producer_task = asyncio.ensure_future(producer_handler(websocket, path))
    done, pending = await asyncio.wait(
        [consumer_task, producer_task],
        return_when=asyncio.FIRST_COMPLETED,
    )
    for task in pending:
        task.cancel()

    #print("opened %s, %s", str(websocket), str(path))
    #async for message in websocket:
        #print(message)


async def consumer_handler(websocket, path):
    async for message in websocket:
        print(message)

async def producer_handler(websocket, path):
    while True:
        message = await producer()
        await websocket.send(message)

async def producer():
    await asyncio.sleep(1)
    return '{"hello":"there"}'

start_server = websockets.serve(handler, "localhost", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()