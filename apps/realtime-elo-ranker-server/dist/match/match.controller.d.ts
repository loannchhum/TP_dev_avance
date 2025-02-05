import { MatchService } from './match.service';
import { Match } from '../entities/match.entity';
import { Response } from 'express';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    MAJElo(match: Match, res: Response): Promise<void>;
}
