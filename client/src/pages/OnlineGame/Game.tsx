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

    function onDrop(sourceSquare: any, targetSquare: any) {
        // orientation is either 'white' or 'black'. game.turn() returns 'w' or 'b'
        if (chess.turn() !== orientation[0]) return false; // <- 1 prohibit player from moving piece of other player

        if (players.length < 2) return false; // <- 2 disallow a move if the opponent has not joined

        const moveData = {
            from: sourceSquare,
            to: targetSquare,
            color: chess.turn(),
            promotion: 'q', // promote to queen where possible
        };

        const move = makeAMove(moveData);

        // illegal move
        if (move === null) return false;

        SocketApi.socket?.emit('move', {
            // <- 3 emit a move event.
            move,
            room,
        }); // this event will be transmitted to the opponent via the server

        return true;
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
                        position={fen}
                        onPieceDrop={onDrop}

                        isDraggablePiece={({ piece }) => {
                            return piece[0] === orientation[0];
                        }}
                        boardOrientation={orientation}
                        animationDuration={500}
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
