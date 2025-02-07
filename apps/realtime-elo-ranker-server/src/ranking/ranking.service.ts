import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RankingService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    getRankings(callback: (error: any, result: { id: string, rank: number }[] | null) => void): void {
        this.playerRepository.find({
            select: ['id', 'rank'],
        })
        .then(players => callback(null, players))
        .catch(error => callback(error, null));
    }
}