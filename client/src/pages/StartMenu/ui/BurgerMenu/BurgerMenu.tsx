import { memo, ReactNode, useMemo } from 'react';
import cls from './BurgerMenu.module.scss';
import Button from '@/components/Button/Button.tsx';
import { Sidebar } from '@/components/Sidebar/Sidebar.tsx';
import { useCycle } from 'framer-motion';
import { AuthSidebar } from '@/features/Auth';
import { useSelector } from 'react-redux';
import { getUserData } from '@/entities/User';

interface BurgerMenuProps {
    trigger?: ReactNode;
}

interface listProps {
    onClick?: () => void;
    content: string;
    trigger?: () => void;
    node?: ReactNode;
}

export const BurgerMenu = memo((props: BurgerMenuProps) => {
    const { trigger } = props;
    const user = useSelector(getUserData);
    const [isSidebarOpen, toggleSidebar] = useCycle(false, true);
    const [isAuthSidebar, toggleAuthSidebar] = useCycle(false, true);

    const listItems: listProps[] = useMemo(
        () => [
            {
                content: user ? 'profile' : 'sign in',
                trigger: toggleAuthSidebar,
                node: (
                    <AuthSidebar
                        isAuthSidebar={isAuthSidebar}
                        setIsAuthSidebar={toggleAuthSidebar}
                    />
                ),
            },
            {
                content: 'Settings',
            },
        ],
        [user, isAuthSidebar, toggleAuthSidebar],
    );

    return (
        <div className={cls.BurgerMenu}>
            <Button onClick={() => toggleSidebar()}>{trigger}</Button>

            <Sidebar isOpen={isSidebarOpen} close={toggleSidebar}>
                <div className={cls.container}>
                    <div className={cls.header}>
                        <h2>Tools</h2>
                    </div>

                    <div className={cls.content}>
                        <ul className={cls.toolsList}>
                            <li className={cls.toolsListItem}>
                                {user ? (
                                    <a
                                        href={`/profile/${user.id}`}
                                        style={{
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                        }}
                                        className={cls.btn}
                                    >
                                        profile
                                    </a>
                                ) : (
                                    <Button
                                        className={cls.btn}
                                        onClick={() => toggleAuthSidebar()}
                                    >
                                        sign in
                                    </Button>
                                )}
                            </li>

                            <li className={cls.toolsListItem}>
                                <Button className={cls.btn}>settings</Button>
                            </li>
                        </ul>
                    </div>
                </div>
                <AuthSidebar
                    isAuthSidebar={isAuthSidebar}
                    setIsAuthSidebar={toggleAuthSidebar}
                />
            </Sidebar>
        </div>
    );
});
