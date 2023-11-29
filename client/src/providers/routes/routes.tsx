import { ReactNode } from 'react';
import { StartMenu } from '@/pages/StartMenu';
import { OnlineGame } from '@/pages/OnlineGame';
import OfflineGame from '@/pages/OfflineGame/OfflineGame.tsx';
import { ProfilePage } from '@/pages/ProfilePage';

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
    {
        path: "/profile/:id",
        element: <ProfilePage/>
    }
];
