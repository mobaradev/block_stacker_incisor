const ws = require('ws');
const { WebSocketServer } = ws;

const server = new WebSocketServer({
    port: 8081
});

// lobby
let lobbyStatus = "open";
let lobbyWaitingRemainTime = 10.00;
let lobbyPlayers = [];

// game
let gameStatus = "";
let gamePlayers = [];

// player - {nick, socket, points, positionX, positionY, sizeX, color}

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        message = JSON.parse(message);
        console.log(message);

        if (message.type === "joinLobby") {
            console.log(message.nick + " wants to join the lobby.");

            if (lobbyStatus == "open") {
                socket.send(JSON.stringify({ type: "joinLobbyResponse", status: true }));
                let player = {
                    nick: message.nick,
                    socket: socket,
                    isReady: false
                };
                lobbyPlayers.push(player);
                console.log(`${message.nick} has joined the lobby.`);

                broadcastLobbyStatus();
            } else {
                socket.send(JSON.stringify({ type: "joinLobbyResponse", status: false }));
            }
        }

        if (message.type === "setPlayerReady") {
            console.log("A player is ready.");
            // Here you can handle the logic when a player is ready
            for (let p of lobbyPlayers) {
                if (p.socket === socket) {
                    p.isReady = true;
                    break;
                }
            }

            broadcastLobbyStatus();
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
        lobbyPlayers = lobbyPlayers.filter(p => p.socket !== socket);

        broadcastLobbyStatus();
    });
});

function update() {

    if (lobbyStatus == "open") {
        let isAtLeastOneReady = false;
        for (let p of lobbyPlayers) {
            if (p.isReady) {
                isAtLeastOneReady = true;
                lobbyStatus = "startingSoon";
                lobbyWaitingRemainTime = 10.00;
                break;
            }
        }
    }

    if (lobbyStatus == "startingSoon") {
        lobbyWaitingRemainTime -= 1 / 60;
        broadcastLobbyStatus();

        if (lobbyWaitingRemainTime <= 0) {
            startGame();
        }
    }

    if (lobbyStatus == "inGame") {

    }
}

function startGame() {
    lobbyStatus = "inGame";

    for (let p of lobbyPlayers) {
        p.socket.send(JSON.stringify({ type: "startGame", players: lobbyPlayers.map(pl => ({ nick: pl.nick })) }));
    }
}

function broadcastLobbyStatus() {
    for (let p of lobbyPlayers) {
        p.socket.send(JSON.stringify({ type: "lobbyUpdate", lobbyStatus: lobbyStatus, lobbyWaitingRemainTime: lobbyWaitingRemainTime, players: lobbyPlayers.map(pl => ({ nick: pl.nick, isReady: pl.isReady })) }));
    }
}

setInterval(update, 1000 / 60);

console.log('WebSocket server is running on ws://localhost:8081');