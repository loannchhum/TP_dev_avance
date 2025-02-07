import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from '../entities/match.entity';
import { Response } from 'express';

@Controller('api/match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Post()
    MAJElo(@Body() match: Match, @Res() res: Response): void {
        this.matchService.MAJElo(match, (error) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.status(200).send('Match updated');
            }
        });
    }
}