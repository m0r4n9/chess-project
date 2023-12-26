import { Figure, figureNames } from './Figure';
import { Colors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '@/assets/figures/bK.png';
import whiteLogo from '@/assets/figures/wK.png';

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = figureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        const deltaX = Math.abs(target.x - this.cell.x);
        const deltaY = Math.abs(target.y - this.cell.y);

        return deltaX <= 1 && deltaY <= 1;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
    }
}
