class WebConnection {
    init() {
        const wsUri = (localStorage.getItem("serverAddress") ? localStorage.getItem("serverAddress") : Config.ONLINE_GAME_SERVER_URL);
        this.ws = new WebSocket(wsUri);
        this.onlineLobbyScene = null;
        this.onlineGameScene = null;

        this.playersInLobby = [];
        this.playersInGame = [];

        this.yourNick = "";

        this.ws.addEventListener("open", () => {
            let randomId = Math.floor(Math.random() * (999 - 1 + 1)) + 1;

            this.yourNick = "Player" + randomId;
            if (localStorage.getItem("playerNick") == null) {
                localStorage.setItem("playerNick", "Player" + randomId);
                this.yourNick = localStorage.getItem("playerNick");
            } else {
                this.yourNick = localStorage.getItem("playerNick");
            }

            this.ws.send(JSON.stringify({ type: "joinLobby", nick: this.yourNick }));
        });

        this.ws.addEventListener("message", (e) => {
            const data = JSON.parse(e.data);
            console.log(`RECEIVED:`);
            console.log(data)

            if (data.type === "joinLobbyResponse") {
                if (data.status == true) {
                    // join
                    console.log("Joined");
                    this.onlineLobbyScene.onLobbyJoin();
                } else {
                    console.log("Can't join lobby at the moment");
                    this.onlineLobbyScene.onLobbyUnavailable();
                }
            }

            if (data.type === "lobbyUpdate") {
                console.log("Current players in lobby:");
                console.log(data.players);
                this.playersInLobby = data.players;
                this.lobbyStatus = data.lobbyStatus;
                this.lobbyWaitingRemainTime = data.lobbyWaitingRemainTime;
            }

            if (data.type === "startGame") {
                console.log("Game is starting!");
                // Handle game start logic here
                this.onlineLobbyScene.onGameStart();
                // alert("Game is starting! Players: " + data.players.map(p => p.nick).join(", "));
            }

            if (data.type === "gameUpdate") {
                this.playersInGame = data.players;
                console.log("Current players in game:");
                console.log(data.players);
            }

            if (data.type === "endGame") {
                console.log("Game has ended.");
                this.onlineGameScene.onGameEnd();
            }
        });
    }

    close() {
        // Close connection if needed
        this.ws.close();
    }
}