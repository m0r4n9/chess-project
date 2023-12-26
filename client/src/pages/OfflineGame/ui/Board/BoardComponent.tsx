import { useEffect, useState } from 'react';
import cls from './BoardComponent.module.scss';
import { Board } from '../../models/Board';
import CellComponent from '../Cell/CellComponent.tsx';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';

interface boardProps {
    board: Board;
    setBoard: (board: Board) => void;
    swapPlayer: () => void;
    currentPlayer: Player | null;
}

const BoardComponent = ({
    board,
    setBoard,
    currentPlayer,
    swapPlayer,
}: boardProps) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (
            selectedCell &&
            selectedCell !== cell &&
            selectedCell.figure?.canMove(cell)
        ) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highLightCells() {
        board.highLightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
        if (currentPlayer?.color) {
            const winColor = currentPlayer.color === "WHITE" ? "black" : currentPlayer.color;
            if (newBoard.isCheckmate(currentPlayer.color)) {
                window.alert("Победа: " + winColor);
            }
        }
    }

    useEffect(() => {
        highLightCells();
    }, [selectedCell]);

    return (
        <>
            <div className={cls.board}>
                {board.cells.map((row) => (
                    <>
                        {row.map((cell) => (
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={
                                    cell.x === selectedCell?.x &&
                                    cell.y === selectedCell?.y
                                }
                            />
                        ))}
                    </>
                ))}
            </div>
        </>
    );
};

export default BoardComponent;
