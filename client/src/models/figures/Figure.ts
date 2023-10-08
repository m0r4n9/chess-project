import {Colors} from "../Colors";
import logo from '../../assets/black-knight.png';
import {Cell} from "../Cell";
import {Board} from "../Board";

export enum figureNames {
    FIGURE = "фигура",
    KING = "король",
    KNIGHT = "конь",
    PAWN = "Пешка",
    ROOK = "Ладья",
    BISHOP = "слон",
    QUEEN = 'королева'
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: figureNames;
    id: number;


    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = figureNames.FIGURE;
        this.id = Math.random();
    }

    public canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) {
            return false;
        }
        return target.figure?.name !== figureNames.KING;

    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    moveFigure(target: Cell) {

    }

}
