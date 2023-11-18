import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Modal } from "../../components/Modal/Modal.tsx";
import SocketApi from "../../api/socket-api.ts";
import { useConnectSocket } from "../../hooks/useConnectSocket/useConnectSocket.ts";

interface InitGameProps {
    setRoom: any;
    setOrientation: any;
    setPlayers: any;
}

export default function InitGame({
    setRoom,
    setOrientation,
    setPlayers,
}: InitGameProps) {
    const [roomDialogOpen, setRoomDialogOpen] = useState(false);
    const [roomInput, setRoomInput] = useState(''); // input state
    const [roomError, setRoomError] = useState('');


    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ py: 1, height: '100vh' }}
        >
            <Modal
                open={roomDialogOpen}
                handleClose={() => setRoomDialogOpen(false)}
                title="Select Room to Join"
                contentText="Enter a valid room ID to join the room"
                handleContinue={() => {
                    // join a room
                    if (!roomInput) return; // if given room input is valid, do nothing.
                    SocketApi.socket?.emit(
                        'joinRoom',
                        { roomId: roomInput },
                        (r: any) => {
                            // r is the response from the server
                            if (r.error) return setRoomError(r.message); // if an error is returned in the response set roomError to the error message and exit
                            console.log('response:', r);
                            setRoom(r?.roomId); // set room to the room ID
                            setPlayers(r?.players); // set players array to the array of players in the room
                            setOrientation('black'); // set orientation as black
                            setRoomDialogOpen(false); // close dialog
                        },
                    );
                }}
            >
                <TextField
                    autoFocus
                    margin="dense"
                    id="room"
                    label="Room ID"
                    name="room"
                    value={roomInput}
                    required
                    onChange={(e) => setRoomInput(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                    error={Boolean(roomError)}
                    helperText={
                        !roomError
                            ? 'Enter a room ID'
                            : `Invalid room ID: ${roomError}`
                    }
                />
            </Modal>
            {/* Button for starting a game */}
            <Button
                variant="contained"
                onClick={() => {
                    SocketApi.socket?.emit(
                        'createRoom',
                        function (roomId: { roomId: string }) {
                            setRoom(roomId?.roomId);
                            setOrientation('white');
                        },
                    );
                }}
            >
                Start a game
            </Button>
            {/* Button for joining a game */}
            <Button
                onClick={() => {
                    setRoomDialogOpen(true);
                }}
            >
                Join a game
            </Button>
        </Stack>
    );
}
