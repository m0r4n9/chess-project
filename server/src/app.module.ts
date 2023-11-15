import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SocketGateway} from './socket/socket.gateway';
import {SequelizeModule} from "@nestjs/sequelize";
import {ChessModule} from './chess/chess.module';
import {BoardModule} from './board/board.module';
import {ChessPiece} from "./chess/chess.model";
import {Board} from "./board/board.model";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'tulege91',
            database: 'chess',
            models: [ChessPiece, Board],
            autoLoadModels: true,
            synchronize: true,
            // sync: {
            //     force: true
            // },
            define: {
                timestamps: false
            }
        }),
        ChessModule,
        BoardModule
    ],
    controllers: [AppController],
    providers: [AppService, SocketGateway],
})
export class AppModule {
}
