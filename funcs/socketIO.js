const socket = {
    init: (http) => {
        const socketIO =  require('socket.io')(http,{
            cors:{origin:"*"}
        });
        
        socketIO.on('connection', async (socket) => {
            console.log(`Incoming connection from ${socket.id}`);
            socket.on('disconnect', async () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
        this.socketInstance = socketIO;
    },
    getInstance: () => {
        return this.socketInstance;
    }
}
/***************************        End Socket Phase **********************************/

module.exports = socket;