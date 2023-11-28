import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Room } from './rooms.model';

@Injectable()
export class RoomsService {
    constructor(@InjectModel(Room) private roomRepository: typeof Room) {}

    async getAll() {
        return this.roomRepository.findAll();
    }

    async getRoom(roomId: string) {
        return await this.roomRepository.findOne({
            where: {
                roomId,
            },
        });
    }

    async getRoomByUserId(userId: string) {
        const rooms = await this.roomRepository.findAll();
        const currentRoom = rooms.reduce((acc, currentValue) => {
            currentValue.players.map(player => {
                if (player.playerId.toString() === userId) {
                    acc = currentValue;
                    return
                }
            });
            return acc;
        }, {} as Room)
        return currentRoom;
    }

    async create(dto: CreateRoomsDto) {
        dto.player.isCreator = true;

        const room = this.roomRepository.build({
            roomId: dto.roomId,
            players: [dto.player],
        });
        await room.save();
        return room;
    }

    async deleteRoom(roomId: string) {
        const room = await this.roomRepository.findOne({
            where: {
                roomId
            }
        });
        await room.destroy();
        // console.log("DELETED ROOM");
    }

    async playerJoin(dto: UpdatePlayerDto) {
        const room = await this.roomRepository.findOne({
            where: {
                roomId: dto.roomId,
            },
        });

        if (room.players.length === 2) {
            throw new BadRequestException('Room is full!');
        }

        await room.update({
            players: [...room.players, dto.player],
        });

        return room;
    }

    async playerLeft(dto: UpdatePlayerDto) {
        const room = await this.roomRepository.findOne({
            where: {
                roomId: dto.roomId,
            },
        });

        let destroy = false;
        const players = room.players.reduce((acc, currentValue) => {
            if (currentValue.playerId === dto.player.playerId) {
                if (currentValue.isCreator) {
                    destroy = true;
                }

                return acc;
            }
            acc.push(currentValue);
            return acc;
        }, []);

        if (destroy) {
            console.log('destroy!');
            await this.roomRepository.destroy({
                where: {
                    roomId: dto.roomId,
                },
            });
            return { message: 'Создатель команты вышел' };
        }

        await room.update({
            players,
        });
        return room;
    }
}
