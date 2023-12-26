import { useEffect, useRef, useState } from 'react';
import cls from './Timer.module.scss';
import { Player } from '../../models/Player';
import { Colors } from '../../models/Colors';

interface timerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer = ({ currentPlayer, restart }: timerProps) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTime();
    }, [currentPlayer]);

    function startTime() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback =
            currentPlayer?.color === Colors.WHITE
                ? decrementWhiteTime
                : decrementBlackTime;
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTime() {
        setBlackTime((prev) => prev - 1);
    }

    function decrementWhiteTime() {
        setWhiteTime((prev) => prev - 1);
    }

    const handleRestart = () => {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    };
    return (
        <div className={cls.timer}>
            <div className={cls.reset}>
                <button onClick={handleRestart}>Restart Game</button>
            </div>
            <div className={cls.info}>
                <h2>Black - {blackTime}</h2>
                <h2>White - {whiteTime}</h2>
            </div>
            <div className={cls.player}>
                <h3>Current Player {currentPlayer?.color}</h3>
            </div>
        </div>
    );
};

export default Timer;
