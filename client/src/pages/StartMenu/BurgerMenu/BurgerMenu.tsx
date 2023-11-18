import { memo, ReactNode } from 'react';
import cls from './BurgerMenu.module.scss';
import Button from '@/components/Button/Button.tsx';
import { Sidebar } from '@/components/Sidebar/Sidebar.tsx';
import { useCycle } from 'framer-motion';

interface BurgerMenuProps {
    trigger?: ReactNode;
}

export const BurgerMenu = memo((props: BurgerMenuProps) => {
    const { trigger } = props;
    const [isSidebarOpen, toggleSidebar] = useCycle(false, true);

    return (
        <div className={cls.BurgerMenu}>
            <Button onClick={() => toggleSidebar()}>{trigger}</Button>

            <Sidebar isOpen={isSidebarOpen} close={toggleSidebar}>
                <ul>
                    <Button>
                        Войти
                    </Button>
                </ul>
            </Sidebar>
        </div>
    );
});
