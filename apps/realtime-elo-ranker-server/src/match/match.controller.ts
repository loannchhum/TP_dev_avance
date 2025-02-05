import { Controller, Post, Body, Res } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from '../entities/match.entity';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Post('api/match')
    MAJElo(@Body() match: Match, @Res() res : Response): Promise<void> {
        return this.matchService.MAJElo(match);
    }
}