import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { v4 } from "uuid";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private rooms = new Map();

  handleConnection(client: Socket) {
    console.log(client.id, "connected");
  }

  handleDisconnect(client: Socket) {
    const gameRooms = Array.from(this.rooms.values());

    gameRooms.forEach((room) => {
      const userInRoom = room.players.find((player) => player.id === client.id);

      if (userInRoom) {
        if (room.players.length < 2) {
          this.rooms.delete(room.roomId);
          return;
        }

        client.to(room.roomId).emit("playerDisconnected", userInRoom);
      }
    });
  }

  @SubscribeMessage("username")
  handleUsername(client: Socket, username: string) {
    console.log("username:", username);
    client.data.username = username;
  }

  @SubscribeMessage("createRoom")
  async handleCreateRoom(client: Socket, payload: any) {
    const roomId = v4();
    await client.join(roomId);

    console.log(roomId);
    console.log("-----\n", payload, "\n------");

    this.rooms.set(roomId, {
      roomId,
      players: [{ id: client.id, username: client.data?.username }],
    });
    return {roomId}
  }

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(
    client: Socket,
    args: { roomId: string },
    callback: (roomUpdate: any) => void,
  ) {
    const room = this.rooms.get(args.roomId);
    let error, message;

    if (!room) {
      error = true;
      message = "Room does not exist";
    } else if (room.players.length <= 0) {
      error = true;
      message = "Room is empty";
    } else if (room.players.length >= 2) {
      error = true;
      message = "Room is full";
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

    await client.join(args.roomId);

    const roomUpdate = {
      ...room,
      players: [
        ...room.players,
        { id: client.id, username: client.data?.username },
      ],
    };

    this.rooms.set(args.roomId, roomUpdate);


    client.to(args.roomId).emit("opponentJoined", roomUpdate);

    return roomUpdate;
  }

  @SubscribeMessage("move")
  handleMove(client: Socket, data: { room: string; move: any }) {
    client.to(data.room).emit("move", data.move);
  }

  @SubscribeMessage("closeRoom")
  async handleCloseRoom(client: Socket, data: { roomId: string }) {
    client.to(data.roomId).emit("closeRoom", data);

    const clientSockets = await this.server.in(data.roomId).fetchSockets();

    clientSockets.forEach((s) => {
      s.leave(data.roomId);
    });

    this.rooms.delete(data.roomId);
  }
}
