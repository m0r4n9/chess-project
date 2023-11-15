import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Board} from "./board.model";

@Module({
    imports: [SequelizeModule.forFeature([Board])]
})
export class BoardModule {}
