import { lazy } from 'react';

export const offlineGameAsync = lazy(
    () => import('./OfflineGame.tsx'),
);
