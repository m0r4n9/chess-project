import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './rooms.model';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [SequelizeModule.forFeature([Room])],
  exports: [RoomsService]
})
export class RoomsModule {}
