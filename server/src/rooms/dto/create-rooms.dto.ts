import { Player } from '../rooms.model';

export class CreateRoomsDto {
    readonly roomId: string;
    readonly player: Player;
}