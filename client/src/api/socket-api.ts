import {Socket, io} from "socket.io-client";

class SocketApi {
    static socket: null | Socket = null;

    static createConnection(): void {
        this.socket = io("http://localhost:8080");

        this.socket.on("connect", () => {
            console.log('connected client');
        });

        this.socket.on("disconnect", () => {
            console.log('disconnect client');
        });
    }
}

export default SocketApi;