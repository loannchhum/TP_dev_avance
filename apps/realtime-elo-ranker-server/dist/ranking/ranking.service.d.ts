import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
export declare class RankingService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    getRankings(callback: (error: any, result: {
        id: string;
        rank: number;
    }[] | null) => void): void;
}
