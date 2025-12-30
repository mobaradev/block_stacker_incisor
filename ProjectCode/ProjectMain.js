// This is the main entry point for this Incisor® project. 
// Throughout the project, this object can be referenced as 'pr'.
class ProjectMain {
    
    init() {
        this.cameraController = new CameraController();
        this.menuScene = new MenuScene(this);
        this.menuScene.init();
    }

    restart() {
        delete this.gameScene;
        // this.gameScene = new GameScene(this);
        // this.gameScene.init();
        this.menuScene = new MenuScene(this);
        this.menuScene.init();
    }

    playGame() {
        delete this.menuScene;
        this.gameScene = new GameScene(this);
        this.gameScene.init();
    }
}