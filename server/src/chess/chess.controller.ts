import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateChessDto} from "./dto/create-chess.dto";
import {ChessService} from "./chess.service";

@Controller('chess')
export class ChessController {
    constructor(private readonly chessService: ChessService) {}

    @Post('/create')
    create(@Body() data: CreateChessDto) {
        console.log(JSON.stringify(data));
        return this.chessService.create(data);
    }
}
