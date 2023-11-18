import { memo, ReactNode } from 'react';
import cls from './Sidebar.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { Overlay } from '@/components/Overlay/Overlay.tsx';

interface SidebarProps {
    isOpen?: boolean;
    close?: () => void;
    children?: ReactNode;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { children, isOpen, close } = props;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 500, opacity: 1 }}
                    exit={{
                        opacity: 1,
                        width: 0,
                        transition: {
                            duration: 0.3,
                        },
                    }}
                    className={cls.sidebar}
                >
                    <Overlay onClick={close}  />
                    <div className={cls.container}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
