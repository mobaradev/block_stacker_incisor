// This is the main entry point for this Incisor® project. 
// Throughout the project, this object can be referenced as 'pr'.
class ProjectMain {

    init() {
        this.webConnection = new WebConnection();
        this.cameraController = new CameraController();
        this.menuScene = new MenuScene(this);
        this.menuScene.init();
        // this.showGameResults();
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

    showGameResults(data) {
        delete this.gameScene;
        this.gameResultsScene = new GameResultsScene(this, data);
        this.gameResultsScene.init();
    }

    showOnlineLobbyScene() {
        this.onlineLobbyScene = new OnlineLobbyScene(this);
        this.onlineLobbyScene.init();
    }

    playOnlineGame() {
        this.onlineGameScene = new OnlineGameScene(this);
        this.onlineGameScene.init();
    }

    showOnlineGameResults(data) {
        this.onlineGameResultsScene = new OnlineGameResultsScene(this, data);
        this.onlineGameResultsScene.init();
    }
}