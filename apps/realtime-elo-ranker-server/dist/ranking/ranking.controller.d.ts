import { RankingService } from './ranking.service';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingController {
    private readonly rankingService;
    private readonly eventEmitter;
    constructor(rankingService: RankingService, eventEmitter: EventEmitter2);
    getRankings(res: Response): void;
    sse(): Observable<MessageEvent>;
}
