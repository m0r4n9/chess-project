import { useEffect, useState } from 'react';
import SocketApi from '../../api/socket-api.ts';

interface useConnectSocketProps {
    setRoom?: (value: string) => void;
    setOrientation?: (orientation: string) => void;
    setPlayers?: (newPlayer: string) => void;
    setRoomDialogOpen?: (open: boolean) => void;
}

export function useConnectSocket(props: useConnectSocketProps) {
    const { setRoom, setOrientation, setPlayers, setRoomDialogOpen } = props;

    const connectSocket = () => {
        SocketApi.createConnection();

        SocketApi.socket?.on('createRoom', (roomId: string) => {
            console.log(roomId);
            setRoom?.(roomId);
            setOrientation?.('white');
        });

        SocketApi.socket?.on('joinRoom', (r: any) => {
            console.log('response:', r);
            setRoom?.(r?.roomId); // set room to the room ID
            setPlayers?.(r?.players); // set players array to the array of players in the room
            setOrientation?.('black'); // set orientation as black
            setRoomDialogOpen?.(false); // close dialog
        });
    };

    useEffect(() => {
        connectSocket();
    }, []);

    return {};
}
