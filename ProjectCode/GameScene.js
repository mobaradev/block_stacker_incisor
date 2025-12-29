
class GameScene {
    constructor(projectMain) {
        this.projectMain = projectMain;
    }
    init() {
        this.isActive = true;

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
                this.levels[i].fillColor.red = 0.3;
                this.levels[i].fillColor.green = 0.3;
                this.levels[i].fillColor.blue = 0.3;
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
            if (!this.isActive) return;
            this.timeSinceLastKey += 1;

            if (nc.keyDownStates.w === true) {
                // alert(parseInt(this.selection.position.x));
                if (this.selection.position.x > 300) {
                    this.p.enable();
                    this.p.playbackController.play();
                }
            }

            if (nc.keyDownStates.s) {
                if (this.timeSinceLastKey > 30) {
                    this.onHit();
                }
            }

            this.update();
            this.updatePlayerMovement();
        }

        let event1 = nc.appEvents.fixedUpdate;
        event1.addCallback(this, "fixedUpdateCallback");
    }

    onHit() {
        this.playerPositionX = this.selection.position.x;

        if (Math.abs(this.playerPositionX - this.correctX) < 1000) {
            this.levels[this.currentLevel].fillColor.red = 0.3;
            this.levels[this.currentLevel].fillColor.green = 0.3;
            this.levels[this.currentLevel].fillColor.blue = 0.3;

            // advance
            this.resizePlayer();

            this.currentLevel += 1;
            this.timeSinceLastKey = 0;
            this.points += 1;

            this.correctX = this.getRandomInt(-500, 500);
            this.indicator.position.x = this.correctX;

            this.currentSpeed = this.getRandomInt(10, 30);

            this.levels[this.currentLevel].fillColor.red = 1;
            this.levels[this.currentLevel].fillColor.green = 1;
            this.levels[this.currentLevel].fillColor.blue = 1;

            this.breakParticle.position.x = this.selection.position.x;
            this.breakParticle.position.y = this.selection.position.y;
            this.breakParticle.playbackController.playOnce();


        } else {
            console.log("Wrong");
        }
    }

    update() {
        if (!this.isActive) return;
        this.projectMain.cameraController.targetPositionY = this.currentLevel * 150;
        this.projectMain.cameraController.update();

        this.indicator.position.y = this.currentLevel * 150;
        this.selection.position.y = this.currentLevel * 150;

        this.text.string = "" + this.points;
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
                this.deactivateObjects();
                this.projectMain.restart();

                return;
            }

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
        for (let i = 0; i < 30; i++) {
            this.levels[i].dispose();
        }
    }
}