import { Cell } from './Cell';
import { Colors } from './Colors';
import { Pawn } from './figures/Pawn';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Rook } from './figures/Rook';
import { Bishop } from './figures/Bishop';
import { Queen } from './figures/Queen';
import { Figure } from './figures/Figure';

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)); //black
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)); //white
                }
            }
            this.cells.push(row);
        }
    }

    getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    private addPawns() {
        for (let i: number = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1));
        }
        for (let i: number = 0; i < 8; i++) {
            new Pawn(Colors.WHITE, this.getCell(i, 6));
        }
    }

    private addKings() {
        new King(Colors.BLACK, this.getCell(4, 0));
        new King(Colors.WHITE, this.getCell(4, 7));
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0));
        new Queen(Colors.WHITE, this.getCell(3, 7));
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0));
        new Knight(Colors.BLACK, this.getCell(6, 0));

        new Knight(Colors.WHITE, this.getCell(1, 7));
        new Knight(Colors.WHITE, this.getCell(6, 7));
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0));
        new Rook(Colors.BLACK, this.getCell(7, 0));
        new Rook(Colors.WHITE, this.getCell(0, 7));
        new Rook(Colors.WHITE, this.getCell(7, 7));
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0));
        new Bishop(Colors.BLACK, this.getCell(5, 0));
        new Bishop(Colors.WHITE, this.getCell(2, 7));
        new Bishop(Colors.WHITE, this.getCell(5, 7));
    }

    public addFigures() {
        this.addPawns();
        this.addKings();
        this.addBishops();
        this.addQueens();
        this.addKnights();
        this.addRooks();
    }

    public highLightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    isCheck(color: Colors): boolean {
        const king = this.findKing(color);
        if (!king) return false;
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                const cell = this.cells[i][j];
                const figure = cell.figure;

                if (
                    figure &&
                    figure.color !== color &&
                    figure.canMove(king!.cell)
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    // Пример добавления вывода в метод isCheckmate
    isCheckmate(color: Colors): boolean {
        console.log('Checking for check:', this.isCheck(color));

        if (this.isCheck(color)) {
            for (let i = 0; i < this.cells.length; i++) {
                for (let j = 0; j < this.cells[i].length; j++) {
                    const cell = this.cells[i][j];
                    const figure = cell.figure;

                    if (figure && figure.color === color) {
                        for (let x = 0; x < this.cells.length; x++) {
                            for (let y = 0; y < this.cells[x].length; y++) {
                                const targetCell = this.cells[x][y];
                                const copyBoard = this.getCopyBoard();
                                const copyFigure = copyBoard.getCell(
                                    cell.x,
                                    cell.y,
                                ).figure;

                                if (copyFigure && copyFigure.canMove(targetCell)) {
                                    if (!copyBoard.isCheck(color)) {
                                        console.log('Move is valid:', cell, 'to', targetCell);
                                        return false;
                                    } else {
                                        console.log('Move is not valid:', cell, 'to', targetCell);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            console.log('No valid moves found.');
            return true;
        }

        console.log('No check detected.');
        return false;
    }


    private findKing(color: Colors): King | null {
        // Поиск короля указанного цвета на доске
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                const cell = this.cells[i][j];
                const figure = cell.figure;

                if (figure instanceof King && figure.color === color) {
                    return figure;
                }
            }
        }

        return null;
    }

    getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        return newBoard;
    }
}
