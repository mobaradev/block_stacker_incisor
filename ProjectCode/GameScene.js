
class GameScene {
    constructor(projectMain) {
        this.projectMain = projectMain;
    }
    init() {
        this.isActive = true;

        this.fadeImg = new GraphicObject();
        this.fadeImg.name = "container";
        this.fadeImg.fillColor = new Color(0,0,0,1);
        this.fadeImg.scale.x = 1000;
        this.fadeImg.scale.y = 1000;
        this.fadeImg.subLayer = 100;

        this.eyes = new GraphicObject(nc.graphicAssets.Eyes);
        this.eyes.scale.x = 0.4;
        this.eyes.scale.y = 0.4;
        this.eyes.position.y = 400;
        this.eyes.subLayer = 5;

        this.leftEye = new GraphicObject(undefined, this.eyes);
        this.leftEye.fillColor = new Color(0, 0, 0, 1);
        this.leftEye.subLayer = 7;
        this.leftEye.position.x = -550;
        this.leftEye.position.y = -350;

        this.baseEyePositionX = 550;

        this.rightEye = new GraphicObject(undefined, this.eyes);
        this.rightEye.fillColor = new Color(0, 0, 0, 1);
        this.rightEye.subLayer = 7;
        this.rightEye.position.x = 550;
        this.rightEye.position.y = -350;



        this.projectMain.cameraController.targetPositionY = 0;
        this.CurrentDirection = 1;
        this.currentSpeed = 15;
        this.timeSinceLastKey = 0;
        this.points = 0;
        this.correctX = 0;

        this.text = new TextAssembly();
        this.text.position.addMotion.x(-900, -850);
        this.text.parent = nc.cameras.MainCamera;

        this.currentLevel = 0;

        this.p = new ParticleSystem();

        this.breakParticle = new ParticleSystem();
        this.breakParticle.subLayer = 1;

        this.levels = [];

        for (let i = 0; i < 30; i++) {
            this.levels[i] = new GraphicObject();
            this.levels[i].position.y = 150 * (0 + i);
            this.levels[i].scale.x = 15;

            if (i > 0) {
                this.levels[i].fillColor.red = 0.0;
                this.levels[i].fillColor.green = 0.0;
                this.levels[i].fillColor.blue = 0.0;
            }
        }

        this.indicator = new GraphicObject();
        this.indicator.position.y = 150;
        this.indicator.scale.x = 5;
        this.indicator.scale.y = 1.2;
        this.indicator.fillColor.red = 1;
        this.indicator.fillColor.green = 0;
        this.indicator.fillColor.blue = 0;
        this.indicator.subLayer = -1;

        this.indicator.position.x = this.correctX;

        this.selection = new GraphicObject();
        this.selection.position.y = 150;
        this.selection.scale.x = 5;
        this.selection.scale.y = 0.8;
        this.selection.fillColor.red = 1;
        this.selection.fillColor.green = 0;
        this.selection.fillColor.blue = 1;
        this.selection.subLayer = 1;
        this.selection.position.x = 0;

        this.fixedUpdateCallback = function () {
            this.update();

            if (!this.isActive) return;
            this.timeSinceLastKey += 1;

            if (nc.keyDownStates[" "]) {
                if (this.timeSinceLastKey > 30) {
                    this.onHit();
                }
            }

            
            this.updatePlayerMovement();
        }

        this.event1 = nc.appEvents.fixedUpdate;
        this.event1.addCallback(this, "fixedUpdateCallback");
    }

    onHit() {
        this.playerPositionX = this.selection.position.x;
        let deltaX = this.playerPositionX - this.correctX;

        if (Math.abs(this.playerPositionX - this.correctX) < 1000) {
            if (deltaX > 20) {
                this.levels[this.currentLevel].fillColor.red = 0.3;
                this.levels[this.currentLevel].fillColor.green = 0.2;
                this.levels[this.currentLevel].fillColor.blue = 0.2;
            } else {
                this.levels[this.currentLevel].fillColor.red = 0.2;
                this.levels[this.currentLevel].fillColor.green = 0.3;
                this.levels[this.currentLevel].fillColor.blue = 0.2;
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

            this.levels[this.currentLevel+1].fillColor.red = 0.2;
            this.levels[this.currentLevel+1].fillColor.green = 0.2;
            this.levels[this.currentLevel+1].fillColor.blue = 0.2;

            this.levels[this.currentLevel+2].fillColor.red = 0.1;
            this.levels[this.currentLevel+2].fillColor.green = 0.1;
            this.levels[this.currentLevel+2].fillColor.blue = 0.1;

            this.levels[this.currentLevel+3].fillColor.red = 0.06;
            this.levels[this.currentLevel+3].fillColor.green = 0.06;
            this.levels[this.currentLevel+3].fillColor.blue = 0.06;

            this.breakParticle.position.x = this.selection.position.x;
            this.breakParticle.position.y = this.selection.position.y;
            this.breakParticle.playbackController.playOnce();


        } else {
            console.log("Wrong");
        }
    }

    update() {
        if (this.isActive && this.fadeImg.colorMultiply.alpha > 0) {
            this.fadeImg.colorMultiply.alpha -= 1/60;
        }

        if (!this.isActive && this.fadeImg.colorMultiply.alpha < 1) {
            this.fadeImg.colorMultiply.alpha += 1/60;
        }
        this.projectMain.cameraController.targetPositionY = this.currentLevel * 150;
        this.projectMain.cameraController.update();
        if (!this.isActive) return;


        this.indicator.position.y = this.currentLevel * 150;
        this.selection.position.y = this.currentLevel * 150;

        this.text.string = "" + this.points;

        this.eyes.position.y = nc.mainCamera.position.y + 800;

        this.leftEye.position.x = -this.baseEyePositionX + this.selection.position.x/8;
        this.rightEye.position.x = this.baseEyePositionX + this.selection.position.x/8;
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
                this.projectMain.cameraController.shake(0.7, 18);
                setTimeout(() => {
                    this.deactivateObjects();
                    this.projectMain.restart();
                }, 1000);

                return;
            }

            this.projectMain.cameraController.shake(0.25, 10);

            this.indicator.scale.x = this.indicator.scale.x - deltaX / 100;
            this.selection.scale.x = this.selection.scale.x - deltaX / 100;
        } else {
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

    deactivateObjects() {
        this.p.dispose();
        this.breakParticle.dispose();
        this.indicator.dispose();
        this.selection.dispose();
        this.text.dispose();
        this.eyes.dispose();
        this.leftEye.dispose();
        this.rightEye.dispose();
        for (let i = 0; i < 30; i++) {
            this.levels[i].dispose();
        }

        this.fadeImg.dispose();
        this.event1.removeCallback(this, "fixedUpdateCallback");
    }
}