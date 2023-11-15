import {Player} from "../../models/Player.ts";
import React from "react";
import {Colors} from "../../models/Colors.ts";

interface CurrentPlayerProps {
    currentPlayer?: Player | null,

}

export const CurrentPlayer = ({currentPlayer}: CurrentPlayerProps) => {

    const currentColor = currentPlayer?.color == Colors.WHITE ? 'white' : 'black'
    return (
        <div className={'currentPlayer'}>
            <h3 style={{display:'flex'}}>
                Current Player
                <span className={currentColor}>
                    {currentPlayer?.color}
                </span>
            </h3>
        </div>
    );
};
