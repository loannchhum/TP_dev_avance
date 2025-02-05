import { Match } from '../entities/match.entity';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../player/player.service';
import { Repository } from 'typeorm';
export declare class MatchService {
    private playerRepository;
    private matchRepository;
    private readonly playerService;
    constructor(playerRepository: Repository<Player>, matchRepository: Repository<Match>, playerService: PlayerService);
    MAJElo(match: Match): Promise<void>;
    private calculateExpectedScore;
}
