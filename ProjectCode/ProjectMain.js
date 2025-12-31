// This is the main entry point for this Incisor® project. 
// Throughout the project, this object can be referenced as 'pr'.
class ProjectMain {
    
    init() {
        this.cameraController = new CameraController();
        // this.menuScene = new MenuScene(this);
        // this.menuScene.init();
        this.showGameResults();

    }

    restart() {
        delete this.gameScene;
        // this.gameScene = new GameScene(this);
        // this.gameScene.init();
        // this.menuScene = new MenuScene(this);
        // this.menuScene.init();
        this.showGameResults();
    }

    playGame() {
        delete this.menuScene;
        this.gameScene = new GameScene(this);
        this.gameScene.init();
    }

    showMenu() {
        this.menuScene = new MenuScene(this);
        this.menuScene.init();
    }

    showGameResults() {
        delete this.gameScene;
        this.gameResultsScene = new GameResultsScene(this);
        this.gameResultsScene.init();
    }
}