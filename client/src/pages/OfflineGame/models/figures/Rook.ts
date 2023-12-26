import {Figure, figureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "@/assets/figures/B_Rook.png";
import whiteLogo from "@/assets/figures/W_Rook.png";

export class Rook extends Figure{

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = figureNames.ROOK;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        if(this.cell.isEmptyVertical(target)){
            return true;
        }
        if(this.cell.isEmptyHorizontal(target)){
            return true;
        }
        return false;
    }
}
