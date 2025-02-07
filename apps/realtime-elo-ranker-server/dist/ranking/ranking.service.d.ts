import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingService {
    private readonly playerRepository;
    private readonly eventEmitter;
    constructor(playerRepository: Repository<Player>, eventEmitter: EventEmitter2);
    getRankings(callback: (error: any, result: {
        id: string;
        rank: number;
    }[] | null) => void): void;
}
