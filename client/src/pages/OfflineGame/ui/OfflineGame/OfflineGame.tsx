import { memo, useEffect, useState } from 'react';
import Timer from '../Timer/Timer.tsx';
import BoardComponent from '../Board/BoardComponent.tsx';
import LostFigures from '../LostFigures/LostFigures.tsx';
import { Colors } from '@/pages/OfflineGame/models/Colors.ts';
import { Board } from '@/pages/OfflineGame/models/Board.ts';
import { Player } from '@/pages/OfflineGame/models/Player.ts';
import './index.css';

const OfflineGame = memo(() => {
    const [whitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [board, setBoard] = useState(new Board());

    useEffect(() => {}, []);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, [whitePlayer]);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setCurrentPlayer(whitePlayer);
    }

    function swapPlayer() {
        setCurrentPlayer(
            currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer,
        );
    }

    return (
        <div className={'appS'}>
            <div>
                <a href='/' className="backMenu">Вернуться в главное меню</a>
                <Timer currentPlayer={currentPlayer} restart={restart} />
            </div>
            <BoardComponent
                board={board}
                currentPlayer={currentPlayer}
                setBoard={setBoard}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title={'Black figures'}
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title={'White figures'}
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
});

export default OfflineGame;
