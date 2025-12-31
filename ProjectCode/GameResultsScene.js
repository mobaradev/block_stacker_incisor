class GameResultsScene {
    constructor(projectMain) {
        this.projectMain = projectMain;
    }
    init() {
        nc.mainCamera.backgroundColor = new Color(0, 0, 0);
        nc.mainCamera.position.y = 0;

        this.fadeEffect = new FadeEffect();
        this.fadeEffect.fadeOut();

        this.isLoadingNextScene = false;

        let sizes = [5.0, 5.0, 4.2, 1.1, 1.1, 0.9, 0.0];
        this.selections = [];

        for (let i = 0; i < sizes.length; i++) {
            let selection = new GraphicObject();
            selection.position.x = -400;
            selection.position.y = -800 + i * 60;
            selection.scale.x = sizes[i];
            selection.scale.y = 0.5;

            if (sizes[i] == 5.0 || sizes[i-1] == sizes[i]) {
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

        this._textFadeDown = true;

        this.text = new TextAssembly();
        this.text.horizontalJustification = "center";
        this.text.string = "SPACE to play again\n ESC to menu";
        this.text.position.x = 400;
        this.text.position.y = 0;

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
    }

    deactivateObjects() {
        this.selections.forEach(selection => {
            selection.dispose();
        });

        this.text.dispose();
        this.fadeEffect.deactivate();
        this.event1.removeCallback(this, "update");
    }
}