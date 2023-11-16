import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SocketGateway} from './socket/socket.gateway';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'tulege91',
            database: 'chess',
            models: [],
            autoLoadModels: true,
            synchronize: true,
            // sync: {
            //     force: true
            // },
            define: {
                timestamps: false
            }
        }),
    ],
    controllers: [AppController],
    providers: [AppService, SocketGateway],
})
export class AppModule {
}
