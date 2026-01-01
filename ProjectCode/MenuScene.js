class MenuScene {
    constructor(projectMain) {
        this.projectMain = projectMain;
    }
    init() {
        nc.mainCamera.backgroundColor = new Color(0, 0, 0);
        this.isLoadingLevel = false;

        this.fadeEffect = new FadeEffect();
        this.fadeEffect.fadeOut();

        this.menuConstruct = nc.constructDefs.MenuConstruct.add();
        this.menuConstruct.position.y = 100;

        this.event1 = nc.appEvents.fixedUpdate;
        this.event1.addCallback(this, "update");
        nc.mainCamera.position.y = 0;

        this.textPlay = this.menuConstruct.children.find(item => item.name == "text_play");
        this.textPlayOnline = this.menuConstruct.children.find(item => item.name == "text_playonline");
        this._textPlayFadeDown = true;

        this.textHighScore = this.menuConstruct.children.find(item => item.name == "text_highscore");
        this.textHighScore.position.addMotion.x(-2, 2);
        this.textHighScore.string = "High score: " + (localStorage.getItem("highScore") ? localStorage.getItem("highScore") : 0);
    }
    update() {
        if (nc.keyDownStates[" "]) {
            if (!this.isLoadingLevel) {
                setTimeout(() => {
                    this.deactivateObjects();
                    this.projectMain.playGame();
                }, 1000);
                this.fadeEffect.fadeIn();
            }
            this.isLoadingLevel = true;
        }

        if (nc.keyDownStates["l"] || nc.keyDownStates["L"]) {
            if (localStorage.getItem("playerNick") == null) {
                let nickname = prompt("Set your nickname (for online games)", "");
                localStorage.setItem("playerNick", nickname);
            }
            if (!this.isLoadingLevel) {
                setTimeout(() => {
                    this.deactivateObjects();
                    this.projectMain.showOnlineLobbyScene();
                }, 1000);
                this.fadeEffect.fadeIn();
            }
            this.isLoadingLevel = true;
        }

        if (nc.keyDownStates["s"] || nc.keyDownStates["S"]) {
            let serverAddress = prompt("Please enter server address (e.g. ws://127.0.0.1:8081):", "ws://127.0.0.1:8081");
            if (serverAddress != null) {
                localStorage.setItem("serverAddress", serverAddress);
            }
        }

        if (nc.keyDownStates["n"] || nc.keyDownStates["N"]) {
            let nickname = prompt("Set your nickname (for online games)", "");
            localStorage.setItem("playerNick", nickname);
        }

        if (this._textPlayFadeDown) {
            this.textPlay.colorMultiply.alpha -= 1 / 60;
            this.textPlayOnline.colorMultiply.alpha -= 1 / 60;
            if (this.textPlay.colorMultiply.alpha <= 0.0) setTimeout(() => { this._textPlayFadeDown = false }, 100);
        } else {
            this.textPlay.colorMultiply.alpha += 1 / 60;
            this.textPlayOnline.colorMultiply.alpha += 1 / 60;
            if (this.textPlay.colorMultiply.alpha >= 1.0) setTimeout(() => { this._textPlayFadeDown = true }, 350);
        }

    }
    deactivateObjects() {
        this.event1.removeCallback(this, "update");
        this.menuConstruct.dispose();

        this.fadeEffect.deactivate();

    }
}