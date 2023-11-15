import {Table, Model, Column, HasMany} from "sequelize-typescript";
import {ChessPiece} from "../chess/chess.model";


@Table
export class Board extends Model {
    @Column({
        allowNull: false,
        unique: true,
    })
    name: string;

    @HasMany(() => ChessPiece)
    pieces: ChessPiece[];

}