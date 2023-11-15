import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ChessPiece} from "./chess.model";
import {Model} from "sequelize-typescript";
import {CreateChessDto} from "./dto/create-chess.dto";

@Injectable()
export class ChessService {
    constructor(@InjectModel(ChessPiece) private readonly chessModel: typeof ChessPiece) {
    }

    async create(chessDto: CreateChessDto) {
        return await this.chessModel.create(chessDto);
    }
}
