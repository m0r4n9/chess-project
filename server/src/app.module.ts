import { Module } from "@nestjs/common";
import { SocketsModule } from "./socket/socket.module";
import { ChatGateway } from "./socket/chat.gateway";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "tulege91",
      database: "chess",
      models: [],
      autoLoadModels: true,
      // synchronize: true,
      // sync: {
      //
      // },
      define: {
        timestamps: false,
      },
    }),
    SocketsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
