class OnlineLobbyScene {
    constructor(projectMain) {
        this.projectMain = projectMain;
    }

    init() {
        this.webConnection = new WebConnection();
        this.webConnection.init();
    }

    update() {

    }
}