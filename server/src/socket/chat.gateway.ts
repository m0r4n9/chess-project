import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 } from 'uuid';
import { RoomsService } from '../rooms/rooms.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private rooms = new Map();

    constructor(private readonly roomService: RoomsService) {}

    handleConnection(client: Socket, ...args: any[]) {
        const userId = client.handshake.query['userId'];
        console.log(client.id, 'connected', userId);
    }

    async handleDisconnect(client: Socket) {
        const userId = client.handshake.query['userId'];
        const room = await this.roomService.getRoomByUserId(userId as string);
        if (room.roomId) {
            this.server.to(room.roomId).emit("playerDisconnected", userId);
            await this.roomService.deleteRoom(room.roomId);
        }
    }

    @SubscribeMessage('createRoom')
    async handleCreateRoom(
        client: Socket,
        userData: { playerId: string; username: string },
    ) {
        const roomId = v4();

        const room = await this.roomService.create({
            roomId,
            player: {
                playerId: userData.playerId,
                username: userData.username,
            },
        });
        await client.join(roomId);
        this.server.emit('updateRooms');
        return room;
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        client: Socket,
        args: {
            roomId: string;
            player: { playerId: string; username: string };
        },
        callback: (roomUpdate: any) => void,
    ) {
        const room = await this.roomService.getRoom(args.roomId);
        let error, message;

        if (!room) {
            error = true;
            message = 'Room does not exist';
        } else if (room.players.length <= 0) {
            error = true;
            message = 'Room is empty';
        } else if (room.players.length >= 2) {
            error = true;
            message = 'Room is full';
        }

        if (error) {
            if (callback) {
                callback({
                    error,
                    message,
                });
            }
            return;
        }

        const roomUpdated = await this.roomService.playerJoin(args);

        client.to(args.roomId).emit('opponentJoined', roomUpdated.players[1]);

        await client.join(args.roomId);
        return roomUpdated;
    }

    @SubscribeMessage('move')
    handleMove(client: Socket, data: { room: string; move: any }) {
        client.to(data.room).emit('move', data.move);
    }

    @SubscribeMessage('closeRoom')
    async handleCloseRoom(client: Socket, data: { roomId: string }) {
        client.to(data.roomId).emit('closeRoom', data);

        const clientSockets = await this.server.in(data.roomId).fetchSockets();

        clientSockets.forEach((s) => {
            s.leave(data.roomId);
        });

        this.rooms.delete(data.roomId);
    }
}
