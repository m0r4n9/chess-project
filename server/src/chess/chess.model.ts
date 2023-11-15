import {Table, Column, Model, ForeignKey, BelongsTo, DataType} from 'sequelize-typescript';
import {Board} from "../board/board.model";


@Table
export class ChessPiece extends Model<ChessPiece> {
    @Column({
        allowNull: false,
    })
    name: string;

    @Column({
        allowNull: false,
    })
    positionX: number;

    @Column({
        allowNull: false,
    })
    positionY: number;

    @ForeignKey(() => Board)
    @Column
    chessBoardId: number;

    @BelongsTo(() => Board)
    chessboard: Board;
}
