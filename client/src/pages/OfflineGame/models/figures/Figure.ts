import { Colors } from '../Colors';
import logo from '@/assets/black-knight.png';
import { Cell } from '../Cell';
import { Board } from '../Board';

export enum figureNames {
    FIGURE = 'фигура',
    KING = 'король',
    KNIGHT = 'конь',
    PAWN = 'Пешка',
    ROOK = 'Ладья',
    BISHOP = 'слон',
    QUEEN = 'королева',
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

    // public canMove(target: Cell): boolean {
    //     if (target.figure?.color === this.color) {
    //         return false;
    //     }
    //     return target.figure?.name !== figureNames.KING;
    // }

    public canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) {
            return false; // Фигура не может атаковать свою собственную фигуру
        }

        const attackingFigures = [
            figureNames.KNIGHT,
            figureNames.PAWN,
            figureNames.ROOK,
            figureNames.BISHOP,
            figureNames.QUEEN,
            // Добавьте другие фигуры, если необходимо
        ];

        if (
            target.figure?.name === figureNames.KING &&
            attackingFigures.includes(this.name)
        ) {
            return true; // Атака короля
        }

        // Дополнительные условия для проверки возможности хода, в зависимости от типа фигуры
        // Добавьте нужные проверки для каждого типа фигуры

        return true; // Дополнительные условия для других типов фигур
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    moveFigure(target: Cell) {}
}
