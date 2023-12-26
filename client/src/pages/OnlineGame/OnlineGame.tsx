import { useCallback, useEffect, useState } from 'react';
import cls from './OnlineGame.module.scss';
import SocketApi from '../../api/socket-api.ts';
import { Rooms } from './Rooms/Rooms.tsx';
import { Game } from './Game/Game.tsx';
import { $api } from '@/api/api.ts';
import socketApi from '@/api/socket-api.ts';
import { useSelector } from 'react-redux';
import { getUserData } from '@/entities/User';
import Button from '@/components/Button/Button.tsx';

interface Player {
    playerId: string;
    username?: string;
    isCreator?: boolean;
}

export interface Room {
    roomId: string;
    players: Player[];
}

export interface RoomData {
    roomId: string;
    players: Player[];
}

export interface RoomJoin {
    roomId: string;
    player: {
        playerId: string;
        username: string;
    };
}

const OnlineGame = () => {
    const [room, setRoom] = useState<RoomData | undefined>(undefined);
    const [orientation, setOrientation] = useState('');
    const [rooms, setRooms] = useState<Room[]>();
    const userData = useSelector(getUserData);

    const connectSocket = (userId: string) => {
        SocketApi.createConnection(userId);
    };

    const fetchRooms = async () => {
        const response = await $api.get('/rooms');
        setRooms(response.data);
    };

    const cleanup = useCallback(async () => {
        setRoom(undefined);
        setOrientation('');
        await fetchRooms();
    }, []);

    useEffect(() => {
        if (!userData?.id) return;
        connectSocket(userData.id);
        fetchRooms();
    }, [userData]);

    useEffect(() => {
        if (!userData?.id) return;
        socketApi.updateRooms(fetchRooms);
    }, [userData]);

    const createRoom = useCallback(() => {
        SocketApi.createRoom(
            {
                playerId: userData?.id || '',
                username: userData?.login || '',
            },
            setRoom,
            setOrientation,
        );
    }, [userData?.id, userData?.login]);

    const joinRoom = useCallback(
        (roomId: string) => {
            SocketApi.joinRoom(
                {
                    roomId,
                    player: {
                        playerId: userData?.id || '',
                        username: userData?.login || '',
                    },
                },
                setRoom,
                setOrientation,
            );
        },
        [userData],
    );

    useEffect(() => {
        SocketApi.opponentJoined(setRoom);
    }, [userData]);

    const content = room ? (
        <Game
            players={room.players}
            userId={userData?.id}
            room={room.roomId}
            orientation={orientation}
            cleanup={cleanup}
        />
    ) : (
        <Rooms rooms={rooms} createRoom={createRoom} joinRoom={joinRoom} />
    );

    return (
        <div className={cls.wrapper}>
            <div
                style={{
                    padding: '10px 20px',
                }}
            >
                <a href={room ? '/online' : '/'} className={cls.exitLink}>
                    Back to main menu
                </a>
            </div>
            {content}
        </div>
    );
};

export default OnlineGame;
