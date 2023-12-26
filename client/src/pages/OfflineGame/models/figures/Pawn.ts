import { Figure, figureNames } from './Figure';
import { Colors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '@/assets/figures/B_Pawn.png';
import whiteLogo from '@/assets/figures/W_Pawn.png';

export class Pawn extends Figure {
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = figureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        const firstStepDirection =
            this.cell.figure?.color === Colors.BLACK ? 2 : -2;

        if (
            (target.y === this.cell.y + direction ||
                (this.isFirstStep &&
                    target.y === this.cell.y + firstStepDirection)) &&
            target.x === this.cell.x &&
            this.cell.board.getCell(target.x, target.y).isEmpty()
        ) {
            return true;
        }

        if (
            target.y === this.cell.y + direction &&
            (target.x === this.cell.x + 1 || target.x == this.cell.x - 1) &&
            this.cell.isEnemy(target)
        ) {
            return true;
        }
        return false;
    }


    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}