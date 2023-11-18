import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './providers/StoreProvider/StoreProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StoreProvider>
            <App />
        </StoreProvider>
    </BrowserRouter>,
);
