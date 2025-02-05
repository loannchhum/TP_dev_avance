import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Match } from '../entities/match.entity';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../player/player.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
        private readonly playerService: PlayerService,
    ) {}

    async MAJElo(match: Match): Promise<void> {
        const { winner, loser, draw } = match;

        const winnerPlayer = await this.playerService.findOne(winner);
        const loserPlayer = await this.playerService.findOne(loser);

        if (!winnerPlayer || !loserPlayer) {
            throw new Error('Player not found');
        }

        const K = 32; // Coefficient de pondération

        if (draw) {
            // Handle draw case
            const expectedScoreWinner = this.calculateExpectedScore(winnerPlayer.rank, loserPlayer.rank);
            const expectedScoreLoser = this.calculateExpectedScore(loserPlayer.rank, winnerPlayer.rank);

            winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (0.5 - expectedScoreWinner));
            loserPlayer.rank = Math.round(loserPlayer.rank + K * (0.5 - expectedScoreLoser));
        } else {
            const expectedScoreWinner = this.calculateExpectedScore(winnerPlayer.rank, loserPlayer.rank);
            const expectedScoreLoser = this.calculateExpectedScore(loserPlayer.rank, winnerPlayer.rank);

            winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (1 - expectedScoreWinner));
            loserPlayer.rank = Math.round(loserPlayer.rank + K * (0 - expectedScoreLoser));
        }

        await this.playerRepository.save(winnerPlayer);
        await this.playerRepository.save(loserPlayer);
        await this.matchRepository.save(match);
    }

    private calculateExpectedScore(rankA: number, rankB: number): number {
        return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
    }
}