import { Column, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    login: string;
    password: string;
}


@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({unique: true, allowNull: false})
    login: string;

    @Column({allowNull: false})
    password: string;

    @Column({defaultValue: 0})
    countGames: number;

    @Column({defaultValue: 0})
    wins: number;
}