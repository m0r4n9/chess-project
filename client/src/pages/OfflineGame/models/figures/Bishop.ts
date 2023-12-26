import { Figure, figureNames } from './Figure';
import { Colors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '@/assets/figures/B_Bishop.png';
import whiteLogo from '@/assets/figures/W_Bishop.png';

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = figureNames.BISHOP;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (this.cell.isEmptyDiagonal(target)) return true;
        return false;
    }
}
