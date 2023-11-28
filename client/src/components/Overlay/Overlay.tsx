import { motion } from 'framer-motion';
import cls from './Overlay.module.scss';
import { useEffect, useRef } from 'react';

interface OverlayProps {
    onClick?: () => void;
}

export const Overlay = (props: OverlayProps) => {
    const { onClick } = props;

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            onClick={onClick}
            className={cls.Overlay}
        />
    );
};
