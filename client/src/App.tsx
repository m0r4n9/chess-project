import { AppRouter } from './providers/routes/AppRouter.tsx';
import { useEffect } from 'react';
import { TOKEN_LOCALSTORAGE_KEY } from '@/consts/localStorage.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch/useAppDispatch.ts';
import { checkAuth } from '@/entities/User/model/services/checkAuth.ts';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)) {
            dispatch(
                checkAuth(localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || ''),
            );
        }
    }, []);

    return (
        <div className="app" id="app">
            <AppRouter />
        </div>
    );
};

export default App;
