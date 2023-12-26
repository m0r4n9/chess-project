import { motion } from 'framer-motion';
import cls from './StartMenu.module.scss';
import { useEffect, useState } from 'react';
import { useMenuAnimation } from '../useMenuAnimation.ts';
import { BurgerMenu } from './BurgerMenu/BurgerMenu.tsx';
import { ReactComponent as BurgerIcon } from '@/assets/icons/burger.svg';
import { useSelector } from 'react-redux';
import { getUserData } from '@/entities/User/index.ts';

interface linksProps {
    href: string;
    text: string;
}

export const StartMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(getUserData);
    const scope = useMenuAnimation({ isOpen });

    useEffect(() => {
        if (localStorage.getItem('_inited')) {
            setIsOpen(true);
            return;
        }

        const timeId = setTimeout(() => {
            setIsOpen(true);
        }, 500);

        localStorage.setItem('_inited', 'true');

        return () => clearTimeout(timeId);
    }, []);

    // TODO: fix animation _inited
    return (
        <div className={cls.Menu}>
            <BurgerMenu trigger={<BurgerIcon />} />
            <div className={cls.content}>
                <motion.div
                    initial={
                        !localStorage.getItem('_inited') && {
                            opacity: 0,
                            scale: 0,
                        }
                    }
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 1,
                            delay: 0.5,
                        },
                    }}
                    className={cls.header}
                >
                    <h1>Retro Chess</h1>
                </motion.div>

                <motion.div
                    ref={scope}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            // delay: 1.5,
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
                            <a href="/offline" className={cls.pixel}>
                                Play with friend!
                            </a>
                        </li>
                        <li>
                            <a href="/single" className={cls.pixel}>
                                Play with computer
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={(e) => {
                                    !user?.id && e.preventDefault()
                                }}
                                href="/online"
                                className={`${cls.pixel} ${
                                    !user?.id ? cls.disabled : ''
                                } `}
                            >
                                Play Online
                            </a>
                            {!user?.id && (
                                <div className={cls.requireAuthInfo}>
                                    Чтобы играть онлайн, войдите в аккаунт
                                </div>
                            )}
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
