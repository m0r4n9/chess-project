import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ChessPiece} from "./chess.model";
import { ChessController } from './chess.controller';
import { ChessService } from './chess.service';

@Module({
    imports: [SequelizeModule.forFeature([ChessPiece])],
    providers: [ChessService],
    controllers: [ChessController]
})
export class ChessModule {}
