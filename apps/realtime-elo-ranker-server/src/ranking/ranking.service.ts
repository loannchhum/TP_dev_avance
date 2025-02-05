import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';

@Injectable()
export class RankingService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
    ) {}

    async getRankings(): Promise<{ id : string, rank: number }[]> {
        return await this.playerRepository.find({
            select: ['id', 'rank'],
            order: { rank: 'DESC' },
        });
    }
}