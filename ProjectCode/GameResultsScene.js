class GameResultsScene {
    constructor(projectMain, data) {
        this.projectMain = projectMain;
        this.sizes = data;
    }
    init() {
        nc.mainCamera.backgroundColor = new Color(0, 0, 0);
        nc.mainCamera.position.y = 0;

        this.fadeEffect = new FadeEffect();
        this.fadeEffect.fadeOut();

        this.gameOverParticle = new ParticleSystem();

        this.isLoadingNextScene = false;

        this.selections = [];

        for (let i = 0; i < this.sizes.length; i++) {
            let selection = new GraphicObject();
            selection.position.x = -400;
            selection.position.y = -800 + i * 60;
            selection.scale.x = this.sizes[i];
            selection.scale.y = 0.5;

            selection.fillColor.alpha = 0 - (30 * i)/100;

            if (i == 0) {
                selection.fillColor.red = 1;
                selection.fillColor.green = 1;
                selection.fillColor.blue = 1;
                selection.scale.y = 0.16;
                selection.position.y += 16;
            }
            else if (this.sizes[i] == 5.0 || this.sizes[i-1] == this.sizes[i]) {
                selection.fillColor.red = .05;
                selection.fillColor.green = .5;
                selection.fillColor.blue = .05;
            } else {
                selection.fillColor.red = .5;
                selection.fillColor.green = .05;
                selection.fillColor.blue = .05;
            }
            selection.subLayer = 1;

            this.selections.push(selection);
        }

        this.skull = new GraphicObject(nc.graphicAssets.skullicon);
        this.skull.position.x = -401;
        this.skull.position.y = -800 + this.sizes.length * 60 + 20;
        this.skull.scale.x = 0.38;
        this.skull.scale.y = 0.32;
        this.skull.subLayer = 1;
        this.skull.colorMultiply.alpha = 0 - (30 * this.sizes.length)/100;

        this._textFadeDown = true;

        this.text = new TextAssembly();
        this.text.horizontalJustification = "center";
        this.text.string = "SPACE to play again\n ESC to menu";
        this.text.position.x = 400;
        this.text.position.y = 0;

        this.scoreText = new TextAssembly();
        this.scoreText.horizontalJustification = "center";
        this.scoreText.string = "" + localStorage.getItem("lastScore");
        this.scoreText.position.x = 400;
        this.scoreText.position.y = 200;
        this.scoreText.textFormat.characterScaleX = 2;
        this.scoreText.textFormat.characterScaleY = 2;

        this.event1 = nc.appEvents.fixedUpdate;
        this.event1.addCallback(this, "update");
    }
    update() {
        if (nc.keyDownStates[" "]) {
            if (!this.isLoadingNextScene) {
                this.fadeEffect.fadeIn();
                setTimeout(() => {
                    this.deactivateObjects();
                    this.projectMain.playGame();
                }, 1000);
                this.isLoadingNextScene = true;
            }
        } else if (nc.keyDownStates["Escape"]) {
            if (!this.isLoadingNextScene) {
                this.fadeEffect.fadeIn();
                setTimeout(() => {
                    this.deactivateObjects();
                    this.projectMain.showMenu();
                }, 1000);
                this.isLoadingNextScene = true;
            }
        }


        if (this._textFadeDown) {
            this.text.colorMultiply.alpha -= 1/60;
            if (this.text.colorMultiply.alpha <= 0.0) setTimeout(() => {this._textFadeDown = false}, 100);
        } else {
            this.text.colorMultiply.alpha += 1/60;
            if (this.text.colorMultiply.alpha >= 1.0) setTimeout(() => {this._textFadeDown = true}, 350);
        }

        this.selections.forEach(selection => {
            if (selection.fillColor.alpha < 1) {
                selection.fillColor.alpha += 1/60;
            }
        });

        if (this.skull.colorMultiply.alpha < 1) {
            this.skull.colorMultiply.alpha += 1/60;

            if (this.skull.colorMultiply.alpha >= 0.025 && !this.visualizationCompleted) {
                this.gameOverParticle.definition = nc.particleSystemDefs.ParticleSystem2;
                this.gameOverParticle.subLayer = 10;
                this.gameOverParticle.position.x = -401;
                this.gameOverParticle.position.y = -800 + this.sizes.length * 60 + 20;
                this.gameOverParticle.playbackController.playOnce();

                this.visualizationCompleted = true;
            }
        }
    }

    deactivateObjects() {
        this.selections.forEach(selection => {
            selection.dispose();
        });

        this.text.dispose();
        this.fadeEffect.deactivate();
        this.skull.dispose();
        this.scoreText.dispose();
        this.event1.removeCallback(this, "update");
        this.gameOverParticle.dispose();
    }
}