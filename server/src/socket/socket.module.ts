import { forwardRef, Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  providers: [],
  imports: [
      forwardRef(() => RoomsModule)
  ]
})
export class SocketsModule {}
