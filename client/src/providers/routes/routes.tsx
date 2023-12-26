import { ReactNode } from 'react';
import { StartMenu } from '@/pages/StartMenu';
import { OnlineGame } from '@/pages/OnlineGame';
import { ProfilePage } from '@/pages/ProfilePage';
import { SingleGameAsync } from '@/pages/SinglePage/SingleGame.async.tsx';
import { OfflineGame } from '@/pages/OfflineGame';

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
        path: '/offline',
        element: <OfflineGame/>
    },
    {
        path: '/single',
        element: <SingleGameAsync />,
    },
    {
        path: '/online',
        element: <OnlineGame />,
    },
    {
        path: '/profile/:id',
        element: <ProfilePage />,
    },
    {
        path: '*',
        element: <StartMenu/>
    }
];
