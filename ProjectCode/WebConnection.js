class WebConnection {
    init() {
        const wsUri = "ws://127.0.0.1:8081";
        const ws = new WebSocket(wsUri);

        ws.addEventListener("open", () => {
            ws.send(JSON.stringify({type: "joinLobby", nick: "player1"}));
        });

        ws.addEventListener("message", (e) => {
            const data = JSON.parse(e.data);
            console.log(`RECEIVED:`);
            console.log(data)

            if (data.type === "joinLobbyResponse") {
                if (data.status == true) {
                    // join
                    alert("Joined");
                } else {
                    alert("Can't join lobby at the moment");
                }
            }
        });
    }
}