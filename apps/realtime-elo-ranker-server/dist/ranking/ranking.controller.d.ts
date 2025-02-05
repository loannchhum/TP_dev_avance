import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getRankings(): Promise<Player[]>;
}
