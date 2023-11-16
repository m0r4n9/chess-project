import {useEffect, useState} from "react";
import SocketApi from "../../api/socket-api.ts";

export function useConnectSocket() {
    const [message, setMessage] = useState('');
    const connectSocket = () => {
        SocketApi.createConnection();

        SocketApi.socket?.on("client-path", (data: any) => {
            setMessage(JSON.stringify(data));
        })
    }

    useEffect(() => {
        connectSocket();
    }, []);

    return {
        message
    }
}