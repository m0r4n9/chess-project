import { useCallback, useEffect, useMemo, useState } from 'react';
import cls from './Game.module.scss';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { Move } from '@/interfaces/ChessTypes/chess.ts';
import SocketApi from '@/api/socket-api.ts';
import { Modal } from '@/components/Modal/Modal.tsx';
import { useCycle } from 'framer-motion';
import Button from '@/components/Button/Button.tsx';

interface GameProps {
    players: any[];
    userId?: string;
    room: any;
    orientation: any;
    cleanup?: any;
}

export const Game = ({
    players,
    room,
    orientation,
    userId,
    cleanup,
}: GameProps) => {
    const chess = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(chess.fen());
    const [over, setOver] = useState('');
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveTo, setMoveTo] = useState<Square | null>(null);
    const [moveFrom, setMoveFrom] = useState('');

    const [isModalOpen, toggleModal] = useCycle(true, false);

    const makeAMove = useCallback(
        (move: any) => {
            try {
                const result = chess.move(move);
                setFen(chess.fen());

                if (chess.game_over()) {
                    if (chess.in_checkmate()) {
                        setOver(
                            `Checkmate! ${
                                chess.turn() === 'w' ? 'black' : 'white'
                            } wins!`,
                        );
                    } else if (chess.in_draw()) {
                        setOver('Draw');
                    } else {
                        setOver('Game over');
                    }
                }

                return result;
            } catch (e) {
                return null;
            }
        },
        [chess],
    );

    function getMoveOptions(square: Square) {
        const moves = chess.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares: any = {};
        moves.map((move: Move) => {
            newSquares[move.to] = {
                background:
                    chess.get(move.to) &&
                    chess.get(move.to).color !== chess.get(square).color
                        ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
                        : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
                borderRadius: '50%',
            };
            return move;
        });
        newSquares[square] = {
            background: 'rgba(255, 255, 0, 0.4)',
        };
        setOptionSquares(newSquares);
        return true;
    }

    function onSquareClick(square: Square) {
        if (
            chess.fen().split(' ')[1] !== orientation[0] ||
            players.length === 1
        )
            return;
        setRightClickedSquares({});

        // Куда пойдет фигура
        if (!moveTo) {
            const moves: Move[] = chess.moves({
                moveFrom,
                verbose: true,
            });
            const foundMove = moves.find(
                (m) => m.from === moveFrom && m.to === square,
            );

            if (!foundMove) {
                const hasMoveOptions = getMoveOptions(square);
                setMoveFrom(hasMoveOptions ? square : '');
                return;
            }

            setMoveTo(square);

            // if promotion move
            if (
                (foundMove.color === 'w' &&
                    foundMove.piece === 'p' &&
                    square[1] === '8') ||
                (foundMove.color === 'b' &&
                    foundMove.piece === 'p' &&
                    square[1] === '1')
            ) {
                return;
            }

            // is normal move
            const move = chess.move({
                from: moveFrom,
                to: square,
                promotion: 'q',
            });

            SocketApi.socket?.emit('move', {
                move,
                room,
            });

            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            setMoveFrom('');
            setMoveTo(null);
            setOptionSquares({});
            return;
        }
    }

    useEffect(() => {
        console.log('Move');
        SocketApi.makeMove(makeAMove);
    }, [makeAMove]);

    useEffect(() => {
        SocketApi.test();
    }, []);

    useEffect(() => {
        SocketApi.socket?.on('playerDisconnected', (userId) => {
            cleanup();
        });

        return () => {};
    }, [cleanup]);


    return (
        <div className={cls.wrapper}>
            <div className={cls.header}>
                <h1 className={cls.title}>Room ID: {room}</h1>
            </div>

            <div className={cls.content}>
                <div
                    className={cls.board}
                    // className="board"
                    style={{
                        maxWidth: 550,
                        maxHeight: 550,
                        flexGrow: 1,
                    }}
                >
                    <Chessboard
                        animationDuration={500}
                        arePiecesDraggable={false}
                        position={chess.fen()}
                        onSquareClick={onSquareClick}
                        promotionToSquare={moveTo}
                        customDarkSquareStyle={{ backgroundColor: '#6f73d2' }}
                        customLightSquareStyle={{ backgroundColor: '#9dacff' }}
                        customBoardStyle={{
                            border: '2px solid black',
                            borderRadius: '4px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                        }}
                        customSquareStyles={{
                            ...moveSquares,
                            ...optionSquares,
                            ...rightClickedSquares,
                        }}
                        boardOrientation={orientation}
                    />
                </div>

                {players?.length > 0 && (
                    <div className={cls.listPlayers}>
                        <div className={cls.listHeader}>
                            <h2>List Players:</h2>
                        </div>
                        <ul className={cls.list}>
                            {players.map((player) => (
                                <li key={player.playerId}>
                                    {userId === player.playerId
                                        ? `You: ${player.username}`
                                        : player.username}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {Boolean(over) && (
                <Modal isOpen={isModalOpen}>
                    <div>
                        <div>
                            <h1>{over}</h1>
                            <h2>Game End!</h2>
                        </div>
                        <div>
                            <Button variant="pixel" onClick={() => {
                                cleanup()
                                SocketApi.socket?.emit("closeRoom", {roomId: room});
                            }}>
                                Закрыть
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

// TODO: create popup, when is game end or somebody disconnect