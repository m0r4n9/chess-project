import { useEffect } from 'react';
import SocketApi from '../../api/socket-api.ts';

export function useConnectSocket() {
    const connectSocket = () => {
        SocketApi.createConnection();
    };

    useEffect(() => {
        connectSocket();
    }, []);

    return {};
}
