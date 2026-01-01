class Config {
    static get ONLINE_GAME_SERVER_URL() {
        return "ws://127.0.0.1:8081";
    }

    static get MAX_NICKNAME_LENGTH() {
        return 10;
    }

    static get MAX_LEVELS() {
        return 128;
    }
}