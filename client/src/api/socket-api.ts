import { Socket, io } from 'socket.io-client';
import { RoomData, RoomJoin } from '@/pages/OnlineGame/OnlineGame.tsx';

interface Player {
    playerId: string;
    username?: string;
    isCreator?: boolean;
}

class SocketApi {
    static socket: null | Socket = null;

    static createConnection(userId: string): void {
        this.socket = io('http://localhost:8080', {
            query: {
                userId,
            },
        });
    }

    static createRoom(
        userData: { playerId: string; username: string },
        setRoom: (roomId: RoomData) => void,
        setOrientation: (orientation: string) => void,
    ): void {
        this.socket?.emit('createRoom', userData, function (temp: any) {
            setRoom(temp);
            setOrientation('white');
        });
    }

    static joinRoom(
        roomData: RoomJoin,
        setRoom: (room: RoomData) => void,
        setOrientation: (orientation: string) => void,
    ): void {
        this.socket?.emit('joinRoom', roomData, function (temp: any) {
            setRoom(temp);
            setOrientation('black');
        });
    }

    static updateRooms(updateRooms: () => Promise<void>): void {
        this.socket?.on('updateRooms', async () => {
            await updateRooms();
        });
    }

    static opponentJoined(setRoom: (prevState: any) => any) {
        this.socket?.on('opponentJoined', (player: Player) => {
            setRoom((prevState: any) => {
                if (typeof prevState === 'object') {
                    return {
                        ...prevState,
                        players: [...prevState.players, player],
                    };
                }
            });
        });
    }

    static makeMove(makeAMove: (move: any) => void) {
        SocketApi.socket?.on('move', (move) => {
            makeAMove(move);
        });
    }

    static test() {
        this.socket?.on("getMes", (data) => {
            console.log(data);
        })
    }


}

export default SocketApi;
