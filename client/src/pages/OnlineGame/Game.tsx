import { useCallback, useEffect, useMemo, useState } from 'react';
import { Chess } from 'chess.js';
import {
    Box,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Stack,
    Typography,
} from '@mui/material';
import { Chessboard } from 'react-chessboard';
import SocketApi from '../../api/socket-api.ts';
import { Modal } from '../../components/Modal/Modal.tsx';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { Move } from '../../interfaces/ChessTypes/chess.ts';

interface GameProps {
    players: any;
    room: any;
    orientation: any;
    cleanup: any;
}

export const Game = ({ players, room, orientation, cleanup }: GameProps) => {
    const chess = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(chess.fen());
    const [over, setOver] = useState('');
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveTo, setMoveTo] = useState<Square | null>(null);
    const [moveFrom, setMoveFrom] = useState('');


    const makeAMove = useCallback(
        (move: any) => {
            try {
                const result = chess.move(move); // update Chess instance
                setFen(chess.fen()); // update fen state to trigger a re-render

                console.log(
                    'over, checkmate',
                    chess.game_over(),
                    chess.in_checkmate(),
                );

                if (chess.game_over()) {
                    // check if move led to "game over"
                    if (chess.in_checkmate()) {
                        // if reason for game over is a checkmate
                        // Set message to checkmate.
                        setOver(
                            `Checkmate! ${
                                chess.turn() === 'w' ? 'black' : 'white'
                            } wins!`,
                        );
                        // The winner is determined by checking for which side made the last move
                    } else if (chess.in_draw()) {
                        // if it is a draw
                        setOver('Draw'); // set message to "Draw"
                    } else {
                        setOver('Game over');
                    }
                }

                return result;
            } catch (e) {
                console.log('dont!!!');
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
        if (chess.fen().split(' ')[1] !== orientation[0]) return;
        if (chess.game_over() || chess.in_checkmate()) {
            window.alert('Game End!');
            chess.reset();
        }
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
                // check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square);
                // if new piece, setMoveFrom, otherwise clear moveFrom
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
                // <- 3 emit a move event.
                move,
                room,
            }); // this event will be transmitted to the opponent via the server

            // if invalid, setMoveFrom and getMoveOptions
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
        SocketApi.socket?.on('move', (move) => {
            makeAMove(move);
        });
    }, [makeAMove]);

    useEffect(() => {
        SocketApi.socket?.on('playerDisconnected', (player) => {
            setOver(`${player.username} has disconnected`); // set game over
        });
    }, []);

    useEffect(() => {
        SocketApi.socket?.on('closeRoom', ({ roomId }) => {
            console.log('closeRoom', roomId, room);
            if (roomId === room) {
                cleanup();
            }
        });
    }, [room, cleanup]);

    return (
        <Stack>
            <Card>
                <CardContent>
                    <Typography variant="h5">Room ID: {room}</Typography>
                </CardContent>
            </Card>
            <Stack flexDirection="row" sx={{ pt: 2 }}>
                <div
                    className="board"
                    style={{
                        maxWidth: 600,
                        maxHeight: 600,
                        flexGrow: 1,
                    }}
                >
                    <Chessboard
                        animationDuration={500}
                        arePiecesDraggable={false}
                        position={chess.fen()}
                        onSquareClick={onSquareClick}
                        promotionToSquare={moveTo}
                        customBoardStyle={{
                            borderRadius: '4px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                        }}
                        customSquareStyles={{
                            ...moveSquares,
                            ...optionSquares,
                            ...rightClickedSquares,
                        }}
                      // onPieceDrop={onDrop}
                      // isDraggablePiece={({ piece }) => {
                      //     return piece[0] === orientation[0]; }}
                        boardOrientation={orientation}
                    />
                </div>
                {players.length > 0 && (
                    <Box>
                        <List>
                            <ListSubheader>Players</ListSubheader>
                            {players.map((p: any) => (
                                <ListItem key={p.id}>
                                    <ListItemText primary={p.username} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Stack>
            <Modal
                open={Boolean(over)}
                title={over}
                contentText={over}
                handleContinue={() => {
                    SocketApi.socket?.emit('closeRoom', { roomId: room });
                    cleanup();
                }}
            />
        </Stack>
    );
};
