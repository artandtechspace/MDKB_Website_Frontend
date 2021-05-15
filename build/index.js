
// Webserver-address
// TODO: Change to real one
const url = "ws://localhost/ws/connect";

// Connection to the backend-server
var caccon = new CACConnection(url,userutils.onPacketSync);

// TODO: Remove. Für Erik: Das hier kann man wie eine art namespace sehen. Soll bei der Orientiertung helfen
// Contains user-stuff.
const userutils = {

    /**
     * If a game-sync packet get's received
     * @param {Packet} packet 
     */
    onPacketSync: (packet) => {
        // Checks if the packet contains the users
        if ("users" in data){
            userutils.usersUpdate(data.users);
        }
        // Continue...
    },


    /**
     * Updates all users to the frontend
     * @param {User[]} users
     */
    _usersUpdate: (users) => {
        // Checks if the received users are valid
        if (!userutils.usersValid(users))
            return;
        
        // Gets the queue
        var queue = $("#snakeholder");

        // Removes all users
        queue.empty();


        // Inserts the received ones
        for (const element of users)
            queue.append(genSnakeItem(element.pos, element.name));
    },


    /**
     * Checks if the received users are valid
     * @param {User[]} users 
     * @returns true/false if the received users are valid
     */
    _usersValid: (users) => {
        let poses = []
        let uuids = []
        
        for (const element of users) {
            //All names are strings?
            if( typeof element.uuid != "string")
                return false;
            
            if (uuids.includes(element.uuid))
                return false;
            
            uuids.push(element.uuid);
            //All pos are int
            if (typeof element.pos != "number")
                return false;
        
            if (poses.includes(element.pos))
                return false;
        
            poses.push(element.pos);
            //All names are string
            if (typeof element.name != "string")
                return false;
        }

        return true;
    }
}

/**
 * Call this function, once the user has accepted the cookie-agreement and wants to start the main service (connection etc.)
 */
function start(){
    caccon.startConnection();
}



function genSnakeItem(pos, name){
    return `<div class="oneitem bg-blue-200 rounded-md m-2 p-4">\
<p class="text-left">\
<span class="text-red-700 p-2 text-3xl align-middle">${pos}.</span>\
<span class="align-middle ml-4 text-xl">${name}</span>\
</p></div>`
}