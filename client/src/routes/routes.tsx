import { ReactNode } from 'react';
import { StartMenu } from '../pages/StartMenu/StartMenu.tsx';
import { OfflineGameAsync } from '../pages/OfflineGame/OfflineGame.async.tsx';
import { OnlineGame } from "../pages/OnlineGame/OnlineGame.tsx";
import Demo from "../pages/OfflineGame/OfflineGame.tsx";

interface RoutesProps {
    path: string;
    element: ReactNode;
}

export const listRoutes: RoutesProps[] = [
    {
        path: '/',
        element: <StartMenu />,
    },
    {
        path: '/single',
        element: <Demo />,
    },
    {
        path: '/online',
        element: <OnlineGame/>
    }
];
