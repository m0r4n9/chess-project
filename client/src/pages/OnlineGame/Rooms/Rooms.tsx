import cls from './Rooms.module.scss';
import { memo } from 'react';
import Button from '@/components/Button/Button.tsx';
import { Room } from '@/pages/OnlineGame/OnlineGame.tsx';

interface RoomsProps {
    rooms?: Room[];
    createRoom: () => void;
    joinRoom: (roomId: string) => void;
}

export const Rooms = memo((props: RoomsProps) => {
    const { rooms, joinRoom, createRoom } = props;

    return (
        <div className={cls.Rooms}>
            <div className={cls.header}>
                <div>
                    <h2 className={cls.title}>Online Chess</h2>
                </div>
                <Button className={cls.btnJoin}>Join Game</Button>
                <Button onClick={createRoom}>Start a game</Button>
            </div>
            <div className={cls.content}>
                <div className={cls.headerContent}>
                    <h3>List Rooms</h3>
                </div>
                <div className={cls.wrapperList}>
                    <ul className={cls.list}>
                        {rooms?.map((room) => (
                            <li key={room.roomId} className={cls.listItems}>
                                <div className={cls.containerItem}>
                                    <div>Name: {room.players[0].username}</div>
                                    <div className={cls.rightSide}>
                                        <Button
                                            onClick={() =>
                                                joinRoom(room.roomId)
                                            }
                                        >
                                            Join
                                        </Button>
                                        <span>
                                            players: {room.players.length}/2
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
});
