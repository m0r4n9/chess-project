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
        <div style={{marginRight:'25px'}}>
            <div style={{display: 'flex', justifyContent:'center'}}>
                <button onClick={handleRestart} className={'restartButton'}>
                    <span>Restart Game</span>
                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"/>
                    </svg>
                </button>
            </div>
            <div>
                <h2>Black - {blackTime}</h2>
                <h2>White - {whiteTime}</h2>
            </div>
        </div>
    );
};

export default Timer;
