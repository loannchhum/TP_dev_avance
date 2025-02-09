import { MatchService } from './match.service';
import { Match } from '../entities/match.entity';
import { Response } from 'express';
import { CreateMatchDto } from './dto/create-match-dto';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    findAll(): Promise<Match[]>;
    findOne(id: number): Promise<Match | null>;
    createMatch(match: CreateMatchDto, res: Response): void;
}
