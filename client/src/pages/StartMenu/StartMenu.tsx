import { motion } from 'framer-motion';
import cls from './StartMenu.module.scss';
import { useEffect, useState } from 'react';
import { useMenuAnimation } from './useMenuAnimation.ts';

export const StartMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation({ isOpen });

    useEffect(() => {
        const timeId = setTimeout(() => {
            setIsOpen(true);
        }, 1200);

        return () => clearTimeout(timeId);
    }, []);

    return (
        <div className={cls.Menu} ref={scope}>
            <div className={cls.content}>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 1.2,
                        },
                    }}
                    className={cls.header}
                >
                    <h1>Retro Chess</h1>
                </motion.div>

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            delay: 1.5,
                            duration: 1,
                        },
                    }}
                    className={cls.navigation}
                >
                    <ul
                        className={cls.list}
                        style={{
                            pointerEvents: isOpen ? 'auto' : 'none',
                            clipPath: 'inset(10% 50% 90% 50% round 10px)',
                        }}
                    >
                        <li>
                            <a
                                href="/single"
                                className={cls.pixel}
                                style={{ color: 'white' }}
                            >
                                Play Offline
                            </a>
                        </li>
                        <li>
                            <a href="/online" className={cls.pixel}>
                                Play Online
                            </a>
                        </li>
                        <li>
                            <a href="#" className={cls.pixel}>
                                Change language
                            </a>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};
