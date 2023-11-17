import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import SocketApi from './api/socket-api.ts';
import { Container, TextField } from '@mui/material';
import { Game } from './Game.tsx';
import InitGame from './initGame.tsx';
import { Modal } from './components/Modal/Modal.tsx';

const App = () => {
    const [username, setUsername] = useState('');
    const [usernameSubmitted, setUsernameSubmitted] = useState(false);

    const [room, setRoom] = useState('');
    const [orientation, setOrientation] = useState('');
    const [players, setPlayers] = useState([]);

    const connectSocket = () => {
        SocketApi.createConnection();
    };

    useEffect(() => {
        connectSocket();
    }, []);

    // resets the states responsible for initializing a game
    const cleanup = useCallback(() => {
        setRoom('');
        setOrientation('');
        setPlayers([]);
    }, []);

    useEffect(() => {
        SocketApi.socket?.on('opponentJoined', (roomData) => {
            console.log('roomData', roomData);
            setPlayers(roomData.players);
        });
    }, []);

    return (
        <Container>
            <Modal
                open={!usernameSubmitted}
                handleClose={() => setUsernameSubmitted(true)}
                title="Pick a username"
                contentText="Please select a username"
                handleContinue={() => {
                    if (!username) return;
                    SocketApi.socket?.emit('username', username);
                    setUsernameSubmitted(true);
                }}
            >
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Modal>
            {room ? (
                <Game
                    room={room}
                    orientation={orientation}
                    players={players}
                    // the cleanup function will be used by Game to reset the state when a game is over
                    cleanup={cleanup}
                />
            ) : (
                <InitGame
                    setRoom={setRoom}
                    setOrientation={setOrientation}
                    setPlayers={setPlayers}
                />
            )}
        </Container>
    );
};

export default App;
