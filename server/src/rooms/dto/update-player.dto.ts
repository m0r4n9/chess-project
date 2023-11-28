import { Player } from '../rooms.model';

export class UpdatePlayerDto {
    readonly roomId: string;
    readonly player: Player;
}