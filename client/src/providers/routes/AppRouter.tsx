import { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { listRoutes } from './routes.tsx';

export const AppRouter = memo(() => {
    return (
        <Suspense fallback="">
            <Routes>
                {listRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </Suspense>
    );
});
