import React, {useState} from 'react';
import './App.css';
import {useConnectSocket} from "./hooks/useConnectSocket/useConnectSocket.ts";
import SocketApi from "./api/socket-api.ts";

const App = () => {
    const [text, setText] = useState('');
    const {message} = useConnectSocket();

    const sendMessage = () => {
        SocketApi.socket?.emit("server-path", {text});
    }

    return (
        <div className={'app'}>
            <h1>Websocket</h1>

            <div>
                <input type="text" onChange={(e) => setText(e.currentTarget.value)}/>
                <button onClick={sendMessage}>
                    Send
                </button>
            </div>

            <div>
                <h3>Back-end message</h3>
                {message}
            </div>
        </div>
    );
};

export default App;
