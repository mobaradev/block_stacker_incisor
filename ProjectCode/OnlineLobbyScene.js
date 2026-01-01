class OnlineLobbyScene {
    constructor(projectMain) {
        this.projectMain = projectMain;
        this.webConnection = this.projectMain.webConnection;
    }

    init() {
        this.webConnection.init();
        this.webConnection.onlineLobbyScene = this;

        this.fadeEffect = new FadeEffect();
        this.fadeEffect.fadeOut();

        this.isLoadingNextScene = false;

        this.isInLobby = false;

        this.text = new TextAssembly();
        this.text.horizontalJustification = "center";
        this.text.string = "...";
        this.text.position.x = 0;
        this.text.position.y = 500;

        this.isPlayerReady = false;

        this.event1 = nc.appEvents.fixedUpdate;
        this.event1.addCallback(this, "update");
    }

    update() {
        if (this.isInLobby) {
            let textString = "Lobby:\n";

            this.webConnection.playersInLobby.forEach(player => {
                textString += player.nick + (player.isReady ? " (Ready)" : " (Not Ready)") + "\n";
            });

            textString += `\nLobby Status: ${this.webConnection.lobbyStatus}`;
            if (this.webConnection.lobbyStatus === "startingSoon") {
                textString += `\nStarting in: ${this.webConnection.lobbyWaitingRemainTime.toFixed(2)}s`;
            }

            this.text.string = textString;
        }

        if (!this.isPlayerReady && nc.keyDownStates[" "]) {
            if (this.isInLobby) {
                this.isPlayerReady = true;
                this.webConnection.ws.send(JSON.stringify({ type: "setPlayerReady" }));
            }
        } else if (nc.keyDownStates["Escape"]) {
            if (!this.isLoadingNextScene) {
                this.fadeEffect.fadeIn();
                setTimeout(() => {
                    this.deactivateObjects();
                    this.webConnection.close();
                    this.projectMain.showMenu();
                }, 1000);
                this.isLoadingNextScene = true;
            }
        }
    }

    onLobbyJoin() {
        this.isInLobby = true;
    }

    onLobbyUnavailable() {
        this.text.string = "Lobby is currently unavailable. Press ESC to return to menu.";
    }

    onGameStart() {
        this.deactivateObjects();
        this.projectMain.playOnlineGame();
    }

    deactivateObjects() {
        this.text.dispose();
        this.fadeEffect.deactivate();
        this.event1.removeCallback(this, "update");
    }
}