
class OnlineGameScene {
    constructor(projectMain) {
        this.projectMain = projectMain;
        this.webConnection = this.projectMain.webConnection;
    }
    init() {
        this.otherPlayersGenerated = false;
        this.fadeEffect = new FadeEffect();
        this.fadeEffect.fadeOut();

        this.webConnection.onlineGameScene = this;

        this.onlineInfoText = new TextBox();
        this.onlineInfoText.parent = nc.mainCamera;
        this.onlineInfoText.horizontalJustification = "center";
        this.onlineInfoText.string = "...";
        this.onlineInfoText.position.x = 750;
        this.onlineInfoText.position.y = 500;
        this.onlineInfoText.subLayer = 999;

        this.isActive = true;
        this.isPlayerDead = false;


        this.eyes = new GraphicObject(nc.graphicAssets.Eyes);
        this.eyes.scale.x = 0.4;
        this.eyes.scale.y = 0.4;
        this.eyes.position.y = 400;
        this.eyes.subLayer = 21;

        this.leftEye = new GraphicObject(nc.graphicAssets.RightEye, this.eyes);
        this.leftEye.fillColor = new Color(0, 0, 0, 1);
        this.leftEye.subLayer = 27;
        this.leftEye.position.x = -550;
        this.leftEye.position.y = -350;

        this.baseEyePositionX = 550;

        this.rightEye = new GraphicObject(nc.graphicAssets.RightEye, this.eyes);
        this.rightEye.fillColor = new Color(0, 0, 0, 1);
        this.rightEye.subLayer = 27;
        this.rightEye.position.x = 550;
        this.rightEye.position.y = -350;

        this.eyesClosed = new GraphicObject(nc.graphicAssets.EyesClosed, this.eyes);
        this.eyesClosed.subLayer = 28;
        this.eyesClosed.position.x = 0;
        this.eyesClosed.position.y = 0;
        // this.eyesClosed.disable();


        this.projectMain.cameraController.targetPositionY = 0;
        this.CurrentDirection = 1;
        this.currentSpeed = 15;
        this.timeSinceLastKey = 0;
        this.points = 0;
        this.correctX = 0;

        this.currentLevel = 0;

        this.p = new ParticleSystem();

        this.breakParticle = new ParticleSystem();
        this.breakParticle.subLayer = 1;

        this.levels = [];
        this.levelNumbers = [];
        this.pastLevelNumbers = [];
        this.pastLevelOutcomeText = [];

        this.pastPlayerSizes = [];

        for (let i = 0; i < Config.MAX_LEVELS; i++) {
            this.levels[i] = new GraphicObject();
            this.levels[i].position.y = 150 * (0 + i);
            this.levels[i].scale.x = 15;

            if (i > 0) {
                this.levels[i].fillColor.red = 0.0;
                this.levels[i].fillColor.green = 0.0;
                this.levels[i].fillColor.blue = 0.0;
            }
        }

        this.levels[this.currentLevel].fillColor.red = 1;
        this.levels[this.currentLevel].fillColor.green = 1;
        this.levels[this.currentLevel].fillColor.blue = 1;

        this.levels[this.currentLevel + 1].fillColor.red = 0.2;
        this.levels[this.currentLevel + 1].fillColor.green = 0.2;
        this.levels[this.currentLevel + 1].fillColor.blue = 0.2;

        this.levels[this.currentLevel + 2].fillColor.red = 0.1;
        this.levels[this.currentLevel + 2].fillColor.green = 0.1;
        this.levels[this.currentLevel + 2].fillColor.blue = 0.1;

        this.levels[this.currentLevel + 3].fillColor.red = 0.06;
        this.levels[this.currentLevel + 3].fillColor.green = 0.06;
        this.levels[this.currentLevel + 3].fillColor.blue = 0.06;

        this.levelNumbers[0] = new TextAssembly();
        this.levelNumbers[0].string = "" + (1 + this.currentLevel);
        this.levelNumbers[0].position.x = -850;
        this.levelNumbers[0].position.y = 150 * this.currentLevel;

        this.levelNumbers[1] = new TextAssembly();
        this.levelNumbers[1].string = "" + (1 + this.currentLevel + 1);
        this.levelNumbers[1].position.x = -850;
        this.levelNumbers[1].position.y = 150 * (this.currentLevel + 1);
        this.levelNumbers[1].textFormat.characterMaterial.colorMultiply.alpha = 0.4;

        this.levelNumbers[2] = new TextAssembly();
        this.levelNumbers[2].string = "" + (1 + this.currentLevel + 2);
        this.levelNumbers[2].position.x = -850;
        this.levelNumbers[2].position.y = 150 * (this.currentLevel + 2);
        this.levelNumbers[2].textFormat.characterMaterial.colorMultiply.alpha = 0.2;

        this.levelNumbers[3] = new TextAssembly();
        this.levelNumbers[3].string = "" + (1 + this.currentLevel + 3);
        this.levelNumbers[3].position.x = -850;
        this.levelNumbers[3].position.y = 150 * (this.currentLevel + 3);
        this.levelNumbers[3].textFormat.characterMaterial.colorMultiply.alpha = 0.1;

        this.indicator = new GraphicObject();
        this.indicator.position.y = 150;
        this.indicator.scale.x = 5;
        this.indicator.scale.y = 1.2;
        this.indicator.fillColor.red = 1;
        this.indicator.fillColor.green = 0;
        this.indicator.fillColor.blue = 0;
        this.indicator.subLayer = -1;

        this.indicator.position.x = this.correctX;

        this.pastIndicators = [];

        this.selection = new GraphicObject();
        this.selection.position.y = 150;
        this.selection.scale.x = 5;
        this.selection.scale.y = 0.8;
        this.selection.fillColor.red = 0;
        this.selection.fillColor.green = 0;
        this.selection.fillColor.blue = 0;
        this.selection.subLayer = 1;
        this.selection.position.x = 0;

        this.pastSelections = [];

        this.startInfoText = new TextAssembly();
        this.startInfoText.string = "Press SPACE to hit";
        this.startInfoText.position.x = 0;
        this.startInfoText.position.y = -180;
        this._startInfoTextFadeDown = true;

        this.gameOverParticle = new ParticleSystem();
        this.gameOverParticle.definition = nc.particleSystemDefs.ParticleSystem2;
        this.gameOverParticle.subLayer = 10;

        this.playerNickTexts = [];

        this.event1 = nc.appEvents.fixedUpdate;
        this.event1.addCallback(this, "update");
    }

    onHit() {
        this.playerPositionX = this.selection.position.x;
        let deltaX = this.playerPositionX - this.correctX;

        this.pastPlayerSizes.push(this.selection.scale.x);

        if (Math.abs(this.playerPositionX - this.correctX) < 1000) {

            if (this.startInfoText) {
                this.startInfoText.dispose();
                this.startInfoText = null;
            }

            let pastLevelNumber = new TextAssembly();
            pastLevelNumber.string = "" + (this.currentLevel + 1);
            pastLevelNumber.position.x = -850;
            pastLevelNumber.position.y = 150 * this.currentLevel;

            this.pastLevelNumbers.push(pastLevelNumber);



            if (Math.abs(deltaX) > 20) {
                this.levels[this.currentLevel].fillColor.red = 0.3;
                this.levels[this.currentLevel].fillColor.green = 0.2;
                this.levels[this.currentLevel].fillColor.blue = 0.2;

                pastLevelNumber.textFormat.characterMaterial.colorMultiply = new Color(0.3, 0.2, 0.2);

                let pastIndicator = new GraphicObject();
                pastIndicator.position.x = this.indicator.position.x;
                pastIndicator.position.y = this.currentLevel * 150;
                pastIndicator.scale.x = this.indicator.scale.x;
                pastIndicator.scale.y = 1.1;
                pastIndicator.fillColor.red = .5;
                pastIndicator.fillColor.green = 0;
                pastIndicator.fillColor.blue = 0;
                pastIndicator.subLayer = -1;

                this.pastIndicators.push(pastIndicator);

                let pastSelection = new GraphicObject();
                pastSelection.position.x = this.selection.position.x;
                pastSelection.position.y = this.currentLevel * 150;
                pastSelection.scale.x = this.selection.scale.x;
                pastSelection.scale.y = 0.8;
                pastSelection.fillColor.red = .1;
                pastSelection.fillColor.green = .05;
                pastSelection.fillColor.blue = .05;
                pastSelection.colorMultiply.alpha = 1.25;
                pastSelection.subLayer = 1;

                this.pastSelections.push(pastSelection);

                this.gameOverParticle.position.x = this.selection.position.x;
                this.gameOverParticle.position.y = this.selection.position.y;
                this.gameOverParticle.playbackController.playOnce();


            } else {
                this.levels[this.currentLevel].fillColor.red = 0.2;
                this.levels[this.currentLevel].fillColor.green = 0.3;
                this.levels[this.currentLevel].fillColor.blue = 0.2;

                pastLevelNumber.textFormat.characterMaterial.colorMultiply = new Color(0.2, 0.3, 0.2);
            }



            // advance
            this.resizePlayer();
            if (!this.isActive) return;

            this.currentLevel += 1;
            this.timeSinceLastKey = 0;
            this.points += 1;

            this.correctX = this.getRandomInt(-500, 500);
            this.indicator.position.x = this.correctX;

            this.currentSpeed = this.getRandomInt(10, 30);

            this.levels[this.currentLevel].fillColor.red = 1;
            this.levels[this.currentLevel].fillColor.green = 1;
            this.levels[this.currentLevel].fillColor.blue = 1;

            this.levels[this.currentLevel + 1].fillColor.red = 0.2;
            this.levels[this.currentLevel + 1].fillColor.green = 0.2;
            this.levels[this.currentLevel + 1].fillColor.blue = 0.2;

            this.levels[this.currentLevel + 2].fillColor.red = 0.1;
            this.levels[this.currentLevel + 2].fillColor.green = 0.1;
            this.levels[this.currentLevel + 2].fillColor.blue = 0.1;

            this.levels[this.currentLevel + 3].fillColor.red = 0.06;
            this.levels[this.currentLevel + 3].fillColor.green = 0.06;
            this.levels[this.currentLevel + 3].fillColor.blue = 0.06;

            this.breakParticle.position.x = this.selection.position.x;
            this.breakParticle.position.y = this.selection.position.y;
            this.breakParticle.playbackController.playOnce();

            this.eyesClosed.enable();
            setTimeout(() => this.eyesClosed.disable(), 100);

            this.levelNumbers[0].string = "" + (1 + this.currentLevel);
            this.levelNumbers[0].position.x = -850;
            this.levelNumbers[0].position.y = 150 * this.currentLevel;

            this.levelNumbers[1].string = "" + (1 + this.currentLevel + 1);
            this.levelNumbers[1].position.x = -850;
            this.levelNumbers[1].position.y = 150 * (this.currentLevel + 1);

            this.levelNumbers[2].string = "" + (1 + this.currentLevel + 2);
            this.levelNumbers[2].position.x = -850;
            this.levelNumbers[2].position.y = 150 * (this.currentLevel + 2);

            this.levelNumbers[3].string = "" + (1 + this.currentLevel + 3);
            this.levelNumbers[3].position.x = -850;
            this.levelNumbers[3].position.y = 150 * (this.currentLevel + 3);


        } else {
            console.log("Wrong");
        }
    }

    update() {
        if (true) {
            let textString = "Players:\n";

            this.webConnection.playersInGame.forEach(player => {
                textString += player.nick + (player.nick === this.webConnection.yourNick ? " [You]" : "") + " - " + player.points + "\n";
            });

            this.onlineInfoText.string = textString;

            if (!this.isPlayerDead) {
                this.webConnection.ws.send(JSON.stringify({ type: "playerGameData", positionX: this.selection.position.x, sizeX: this.selection.scale.x, points: this.currentLevel, color: { red: 1, green: 1, blue: 1 } }));
            }
        }

        if (!this.isPlayerDead) {
            this.projectMain.cameraController.targetPositionY = 200 + this.currentLevel * 150;
            this.projectMain.cameraController.update();
            if (!this.isActive) return;

            this.timeSinceLastKey += 1;

            if (nc.keyDownStates[" "]) {
                if (this.timeSinceLastKey > 30) {
                    this.onHit();
                }
            }

            this.indicator.position.y = this.currentLevel * 150;
            this.selection.position.y = this.currentLevel * 150;

            this.eyes.position.y = nc.mainCamera.position.y + 800;

            this.leftEye.position.x = -this.baseEyePositionX + this.selection.position.x / 8;
            this.rightEye.position.x = this.baseEyePositionX + this.selection.position.x / 8;

            this.updatePlayerMovement();

            this.pastSelections.forEach(pastSelection => {
                if (pastSelection.colorMultiply.alpha > 0.3) pastSelection.colorMultiply.alpha -= 1 / 60;
            });

            if (this.startInfoText) {
                if (this._startInfoTextFadeDown) {
                    this.startInfoText.colorMultiply.alpha -= 1 / 60;
                    if (this.startInfoText.colorMultiply.alpha <= 0.0) setTimeout(() => { this._startInfoTextFadeDown = false }, 100);
                } else {
                    this.startInfoText.colorMultiply.alpha += 1 / 60;
                    if (this.startInfoText.colorMultiply.alpha >= 1.0) setTimeout(() => { this._startInfoTextFadeDown = true }, 350);
                }
            }
        }

        if (!this.otherPlayersGenerated) {
            this.otherPlayers = [];
        }
        for (let i = 0; i < this.webConnection.playersInGame.length; i++) {
            if (!this.otherPlayersGenerated) {
                this.otherPlayers.push(new GraphicObject());
                let playerNickText = new TextBox();
                playerNickText.string = (this.webConnection.playersInGame[i].nick === this.webConnection.yourNick ? "[You]" : this.webConnection.playersInGame[i].nick);
                playerNickText.position.y = 80;
                playerNickText.position = this.otherPlayers[i].position;
                playerNickText.textFormat.characterScaleX = 0.8;
                playerNickText.textFormat.characterScaleY = 0.8;
                playerNickText.subLayer = 20;

                this.playerNickTexts.push(playerNickText);
                this.generatingOtherPlayers = true;
            }

            if (this.otherPlayers[i]) {
                this.otherPlayers[i].scale.x = this.webConnection.playersInGame[i].sizeX;
                this.otherPlayers[i].scale.y = 0.6;
                this.otherPlayers[i].fillColor.red = 0.5;
                this.otherPlayers[i].fillColor.green = 0.2;
                this.otherPlayers[i].fillColor.blue = 0.2;
                this.otherPlayers[i].subLayer = 1;
                this.otherPlayers[i].position.x = this.webConnection.playersInGame[i].positionX;
                this.otherPlayers[i].position.y = this.webConnection.playersInGame[i].points * 150;

                if (this.webConnection.playersInGame[i].nick === this.webConnection.yourNick) {
                    this.otherPlayers[i].fillColor.alpha = 0; // do not show yourself from server
                }
            }
        }
        if (!this.otherPlayersGenerated && this.generatingOtherPlayers) this.otherPlayersGenerated = true;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    resizePlayer() {
        let deltaX = this.playerPositionX - this.correctX;

        if (Math.abs(deltaX) > 20) {
            this.projectMain.cameraController.changeToColor(.5, 0, 0);
            setTimeout(() => this.projectMain.cameraController.changeToColor(0, 0, 0), 250);

            let direction = 0;
            if (deltaX < 0) {
                direction = 1; // cut from the right
            }
            else {
                direction = -1; // cut from the left
            }
            deltaX = Math.abs(deltaX);

            if (deltaX / 100 >= this.selection.scale.x) {
                console.log('Game over');
                this.isActive = false;
                this.fadeEffect.fadeIn();
                this.projectMain.cameraController.shake(0.7, 18);

                localStorage.setItem("lastOnlineScore", this.currentLevel);

                this.isPlayerDead = true;
                this.webConnection.ws.send(JSON.stringify({ type: "setPlayerDead" }));

                return;
            }

            this.projectMain.cameraController.shake(0.25, 10);

            const oldScale = this.indicator.scale.x;
            const newScale = this.indicator.scale.x - deltaX / 100;

            this.indicator.scale.x = this.indicator.scale.x - deltaX / 100;
            this.selection.scale.x = this.selection.scale.x - deltaX / 100;

            let pastLevelOutcomeText = new TextAssembly();
            pastLevelOutcomeText.subLayer = 18;
            pastLevelOutcomeText.textFormat.characterMaterial.colorMultiply = new Color(0, 0, 0, 1);
            pastLevelOutcomeText.position.x = 672;
            if (this.selection.position.x > 350) pastLevelOutcomeText.position.x = -682;
            pastLevelOutcomeText.position.y = 150 * this.currentLevel;
            pastLevelOutcomeText.textFormat.characterScaleX = 0.7;
            pastLevelOutcomeText.textFormat.characterScaleY = 0.7;
            pastLevelOutcomeText.string = "-" + parseInt(100 * (oldScale - newScale) / oldScale) + "%";

            this.pastLevelOutcomeText.push(pastLevelOutcomeText);

            nc.sounds.hitHurt.playOnce();
        } else {
            // nc.sounds.Beep.playOnce();
            nc.sounds.pickupCoin.playOnce();
            this.projectMain.cameraController.changeToColor(0, .5, 0);
            setTimeout(() => this.projectMain.cameraController.changeToColor(0, 0, 0), 250);
        }


    }

    updatePlayerMovement() {
        this._calculateMaxDeltaX();

        if (this.CurrentDirection == 1) // right
        {
            this.selection.position.x += this.currentSpeed;

            if (this.selection.position.x >= this._maxDeltaX) {
                this.CurrentDirection = -1;
            }
        } else if (this.CurrentDirection == -1) {
            this.selection.position.x -= this.currentSpeed;

            if (this.selection.position.x <= -this._maxDeltaX) {
                this.CurrentDirection = 1;
            }
        }
    }

    _calculateMaxDeltaX() {
        let sizeX = this.selection.scale.x;

        this._maxDeltaX = 750 - (sizeX * 100 / 2);
    }

    onGameEnd() {
        setTimeout(() => {
            this.deactivateObjects();
            this.projectMain.showOnlineGameResults(this.pastPlayerSizes, this.webConnection.playersInGame);
        }, 1000);
    }

    deactivateObjects() {
        this.p.dispose();
        this.breakParticle.dispose();
        this.indicator.dispose();
        this.selection.dispose();
        this.eyes.dispose();
        this.leftEye.dispose();
        this.rightEye.dispose();
        this.eyesClosed.dispose();
        for (let i = 0; i < Config.MAX_LEVELS; i++) {
            this.levels[i].dispose();
        }

        this.levelNumbers.forEach(number => {
            number.dispose();
        });

        this.pastLevelNumbers.forEach(number => {
            number.dispose();
        });

        this.pastLevelOutcomeText.forEach(text => {
            text.dispose();
        });

        this.pastIndicators.forEach(indicator => {
            indicator.dispose();
        });

        this.pastSelections.forEach(selection => {
            selection.dispose();
        });

        this.otherPlayers.forEach(player => {
            player.dispose();
        });

        this.playerNickTexts.forEach(player => {
            player.dispose();
        });

        this.gameOverParticle.dispose();

        // this.fadeImg.dispose();
        this.fadeEffect.deactivate();
        this.event1.removeCallback(this, "update");

        this.onlineInfoText.dispose();

        if (this.startInfoText) {
            this.startInfoText.dispose();
            this.startInfoText = null;
        }
    }
}