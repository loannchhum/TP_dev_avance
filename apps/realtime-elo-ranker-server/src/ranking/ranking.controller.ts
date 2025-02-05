import { Controller, Get, Post } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';

@Controller('api/ranking')
export class RankingController {
    constructor(private readonly rankingService: RankingService) {}

    @Get()
    async getRankings(): Promise<Player[]> {
        return await this.rankingService.getRankings();
    }
}