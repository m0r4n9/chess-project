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
                    animate={{
                        width: 500,
                        opacity: 1,
                        transition: { duration: 0.2 },
                    }}
                    exit={{
                        width: 0,
                        pointerEvents: 'none',
                        transition: {
                            duration: 0.2,
                        },
                    }}
                    className={cls.sidebar}
                >
                    <Overlay onClick={close} />
                    <div className={cls.container}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.2 } }}
                            exit={{ opacity: 0 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
