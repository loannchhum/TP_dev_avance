import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match } from '../entities/match.entity';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../player/player.service';
export declare class MatchService {
    private matchRepository;
    private playerRepository;
    private readonly playerService;
    private readonly eventEmitter;
    constructor(matchRepository: Repository<Match>, playerRepository: Repository<Player>, playerService: PlayerService, eventEmitter: EventEmitter2);
    MAJElo(match: Match, callback: (error: any) => void): void;
    private calculateScore;
}
