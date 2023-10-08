import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface timerProps {
    currentPlayer: Player | null,
    restart: ()=>void,
}
const Timer:FC<timerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    useEffect(()=>{
        startTime()
    }, [currentPlayer])
    function startTime(){
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ?
            decrementWhiteTime: decrementBlackTime
        timer.current = setInterval(callback, 1000)
    }
    function decrementBlackTime() {
        setBlackTime(prev => prev-1)
    }
    function decrementWhiteTime() {
        setWhiteTime(prev => prev-1)
    }
    const handleRestart = () =>{
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }
    return (
        <div>
            <div>
                <button onClick={handleRestart}>
                    Restart Game
                </button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;