import { memo, useState } from 'react';
import cls from './AuthSidebar.module.scss';
import Button from '@/components/Button/Button.tsx';
import { Sidebar } from '@/components/Sidebar/Sidebar.tsx';
import { useAppDispatch } from '@/hooks/useAppDispatch/useAppDispatch.ts';
import { authByLogin } from '../../model/services/AuthByLogin.ts';

interface AuthSidebarProps {
    isAuthSidebar?: boolean;
    setIsAuthSidebar?: () => void;
}

// TODO Registration service

export const AuthSidebar = memo((props: AuthSidebarProps) => {
    const { isAuthSidebar, setIsAuthSidebar } = props;
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const auth = () => {
        dispatch(authByLogin({ login, password }));
    };

    return (
        <div>
            <Sidebar isOpen={isAuthSidebar} close={setIsAuthSidebar}>
                <div className={cls.authContent}>
                    <div className={cls.containerTitle}>
                        <h3>Auth</h3>
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

                        <div className={cls.containerBtns}>
                            <Button className={cls.signBtn} onClick={auth}>
                                Sign In
                            </Button>
                            <Button className={cls.regBtn}>Registration</Button>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
});
