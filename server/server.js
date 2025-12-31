import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ 
  port: 8081 
});

let lobbyStatus = "open";
let lobbyPlayers = [];

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        message = JSON.parse(message);
        console.log(message);

        if (message.type === "joinLobby") {
            console.log(message.nick + " wants to join the lobby.");

            if (lobbyStatus == "open") {
                socket.send(JSON.stringify({type: "joinLobbyResponse", status: true}));
            } else {
                socket.send(JSON.stringify({type: "joinLobbyResponse", status: false}));
            }
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8081');