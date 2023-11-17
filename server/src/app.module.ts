import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { SocketsModule } from "./socket/socket.module";
import { ChatGateway } from "./socket/chat.gateway";

@Module({
  imports: [SocketsModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
