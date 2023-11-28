import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { Player } from './rooms.model';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('rooms')
export class RoomsController {
    constructor(private roomService: RoomsService) {}

    @Get()
    getAll() {
        return this.roomService.getAll();
    }

    @Get('/test')
    getRoomByUserId(@Query() query: {userId: string}) {
        return this.roomService.getRoomByUserId(query.userId);
    }

    @Post()
    create(@Body() dto: CreateRoomsDto) {
        return this.roomService.create(dto);
    }

    @Put("/join")
    playerJoin(@Body() dto: UpdatePlayerDto) {
        return this.roomService.playerJoin(dto);
    }

    @Put('/left')
    playerLeft(@Body() dto: UpdatePlayerDto) {
        return this.roomService.playerLeft(dto);
    }
}
