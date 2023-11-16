import {SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, WebSocketGateway} from '@nestjs/websockets';
import {Socket} from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class SocketGateway implements OnGatewayConnection {

    @SubscribeMessage('server-path')
    handleEvent(@MessageBody() dto: any, @ConnectedSocket() client: any) {
        console.log("dto: ", dto);
        const res = {type: 'someType', dto};
        client.emit("client-path", res);
    }

    handleConnection(client: Socket) {

    }

    handleDisconnect(client: Socket) {

    }

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): void {
        console.log(client);
        console.log("Connected");
    }
}
