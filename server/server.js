const ws = require('ws');
const { WebSocketServer } = ws;

const server = new WebSocketServer({
    port: 8081
});

// lobby
let lobbyStatus = "open";
let lobbyWaitingRemainTime = 4.00;
let lobbyPlayers = [];

// game
let gameStatus = "";
let gamePlayers = [];
let gameTime = 0;

// player - {nick, socket, isAlive, points, positionX, sizeX, color}

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

        if (message.type === "playerGameData") {
            // Update game state based on player messages
            for (let p of gamePlayers) {
                if (p.socket === socket) {
                    p.positionX = message.positionX;
                    p.sizeX = message.sizeX;
                    p.color = message.color
                    p.points = message.points;
                    break;
                }
            }
        }

        if (message.type === "setPlayerDead") {
            for (let p of gamePlayers) {
                if (p.socket === socket) {
                    p.isAlive = false;
                    break;
                }
            }
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
        lobbyPlayers = lobbyPlayers.filter(p => p.socket !== socket);
        gamePlayers = gamePlayers.filter(p => p.socket !== socket);

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
                lobbyWaitingRemainTime = 4.00;
                break;
            }
        }
        broadcastLobbyStatus();
    }

    if (lobbyStatus == "startingSoon") {
        lobbyWaitingRemainTime -= 1 / 60;
        broadcastLobbyStatus();

        if (lobbyWaitingRemainTime <= 0) {
            startGame();
        }
    }

    if (lobbyStatus == "inGame") {
        gameTime += (1 / 30);
        let areAllDead = true;
        for (let p of gamePlayers) {
            if (p.isAlive) {
                areAllDead = false;
                break;
            }
        }

        if (areAllDead || gamePlayers.length == 0) {
            endGame();
        } else {
            broadcastGame();
        }

        console.log("Game time: " + gameTime + "s");

        if (gameTime >= 180) {
            console.log("Game time limit reached.");
            endGame();
        }
    }
}

function startGame() {
    this.gameTime = 0;
    lobbyStatus = "inGame";

    for (let p of lobbyPlayers) {
        let gamePlayer = { nick: p.nick, socket: p.socket, isAlive: true, points: 0, positionX: 0, sizeX: 5, color: { red: 1, green: 1, blue: 1 } };
        gamePlayers.push(gamePlayer);
    }

    for (let p of lobbyPlayers) {
        p.socket.send(JSON.stringify({ type: "startGame", players: lobbyPlayers.map(pl => ({ nick: pl.nick })) }));
    }
}

function broadcastLobbyStatus() {
    for (let p of lobbyPlayers) {
        p.socket.send(JSON.stringify({ type: "lobbyUpdate", lobbyStatus: lobbyStatus, lobbyWaitingRemainTime: lobbyWaitingRemainTime, players: lobbyPlayers.map(pl => ({ nick: pl.nick, isReady: pl.isReady })) }));
    }
}

function broadcastGame() {
    for (let p of gamePlayers) {
        p.socket.send(JSON.stringify({ type: "gameUpdate", players: gamePlayers.map(pl => ({ nick: pl.nick, isAlive: pl.isAlive, points: pl.points, positionX: pl.positionX, sizeX: pl.sizeX, color: pl.color })) }));
    }
}

function endGame() {
    lobbyStatus = "open";
    lobbyPlayers = [];
    let lobbyWaitingRemainTime = 4.00;

    for (let p of gamePlayers) {
        p.socket.send(JSON.stringify({ type: "endGame" }));
    }

    gamePlayers = [];
}

setInterval(update, 1000 / 30);

console.log('WebSocket server is running on ws://localhost:8081');