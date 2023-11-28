import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface Player {
    playerId: string;
    username?: string;
    isCreator?: boolean;
}

interface RoomsCreateAttrs {
    roomId: string;
    players: Player[];
}

@Table({tableName: 'Rooms'})
export class Room extends Model<Room, RoomsCreateAttrs> {
    @Column({unique: true, allowNull: false})
    roomId: string;

    @Column({type: DataType.JSONB, allowNull: true})
    players: Player[];
}
