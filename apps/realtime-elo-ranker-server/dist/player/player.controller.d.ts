import { PlayerService } from './player.service';
import { Player } from '../entities/player.entity';
export declare class PlayerController {
    private readonly PlayerService;
    constructor(PlayerService: PlayerService);
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player>;
    create(Player: Player): Promise<Player>;
    remove(id: string): Promise<void>;
    getRanking(): Promise<Player[]>;
}
