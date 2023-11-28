import { ReactNode } from 'react';
import { StartMenu } from '@/pages/StartMenu';
import OfflineGame from '@/pages/OfflineGame/OfflineGame.tsx';
import { OnlineGame } from '@/pages/OnlineGame/OnlineGame.tsx';

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
        element: <OfflineGame />,
    },
    {
        path: '/online',
        element: <OnlineGame />,
    },
];
