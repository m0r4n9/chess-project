import { memo, useState } from 'react';
import cls from './AuthSidebar.module.scss';
import Button from '@/components/Button/Button.tsx';
import { Sidebar } from '@/components/Sidebar/Sidebar.tsx';
import { useAppDispatch } from '@/hooks/useAppDispatch/useAppDispatch.ts';
import { authByLogin } from '../../model/services/AuthByLogin.ts';
import { registration } from '@/features/Auth/model/services/registration.ts';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/providers/StoreProvider';

interface AuthSidebarProps {
    isAuthSidebar?: boolean;
    setIsAuthSidebar?: () => void;
}

export const AuthSidebar = memo((props: AuthSidebarProps) => {
    const { isAuthSidebar, setIsAuthSidebar } = props;
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const errorAuth = useSelector((state: StateSchema) => state.auth.error);
    const [isAuth, setIsAuth] = useState(true);

    const auth = () => {
        dispatch(authByLogin({ login, password }));
    };

    const handlerRegistration = () => {
        if (!login) {
            setError("Введите логин");
            return
        }
        if (password !== password2) {
            setError("Пароли не совпадают");
            return;
        }
        dispatch(registration({ login, password }));
    };

    const toggleContent = () => {
        setIsAuth((prevState) => !prevState);
    };

    const footer = isAuth ? (
        <>
            <Button className={cls.signBtn} onClick={auth}>
                Sign In
            </Button>
            <Button className={cls.regBtn} onClick={toggleContent}>
                Registration
            </Button>
        </>
    ) : (
        <>
            <Button className={cls.signBtn} onClick={handlerRegistration}>
                Registration
            </Button>
            <Button className={cls.regBtn} onClick={toggleContent}>
                Already have account?
            </Button>
        </>
    );

    return (
        <div>
            <Sidebar isOpen={isAuthSidebar} close={setIsAuthSidebar}>
                <div className={cls.authContent}>
                    <div className={cls.containerTitle}>
                        <h3>Auth</h3>
                        {error && (<p style={{fontSize: 24, color: "#ce4646"}}>{error}</p>)}
                        {errorAuth && (<p style={{fontSize: 24, color: "#ce4646"}}>{errorAuth}</p>)}
                    </div>

                    <div className={cls.containerInput}>
                        <div className={cls.wrapperInput}>
                            <label htmlFor="login">Login</label>
                            <input
                                id="login"
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className={cls.wrapperInput}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {!isAuth && (
                            <div className={cls.wrapperInput}>
                                <label htmlFor="password_2">Repeat Password</label>
                                <input
                                    id="password_2"
                                    type="password"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                            </div>
                        )}

                        <div className={cls.containerBtns}>{footer}</div>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
});
