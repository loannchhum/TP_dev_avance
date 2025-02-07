import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match } from '../entities/match.entity';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../player/player.service';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
        private readonly playerService: PlayerService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    MAJElo(match: Match, callback: (error: any) => void): void {
        const { winner, loser, draw } = match;

        this.playerService.findOne(winner, (error, winnerPlayer) => {
            if (error || !winnerPlayer) {
                callback(error || new Error('Winner player not found'));
                return;
            }

            this.playerService.findOne(loser, (error, loserPlayer) => {
                if (error || !loserPlayer) {
                    callback(error || new Error('Loser player not found'));
                    return;
                }

                const K = 32;

                if (draw) {
                    const expectedScoreWinner = this.calculateScore(winnerPlayer.rank, loserPlayer.rank);
                    const expectedScoreLoser = this.calculateScore(loserPlayer.rank, winnerPlayer.rank);

                    winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (0.5 - expectedScoreWinner));
                    loserPlayer.rank = Math.round(loserPlayer.rank + K * (0.5 - expectedScoreLoser));
                } else {
                    const expectedScoreWinner = this.calculateScore(winnerPlayer.rank, loserPlayer.rank);
                    const expectedScoreLoser = this.calculateScore(loserPlayer.rank, winnerPlayer.rank);

                    winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (1 - expectedScoreWinner));
                    loserPlayer.rank = Math.round(loserPlayer.rank + K * (0 - expectedScoreLoser));
                }

                this.playerRepository.save(winnerPlayer)
                    .then(() => this.playerRepository.save(loserPlayer))
                    .then(() => this.matchRepository.save(match))
                    .then(() => {
                        this.eventEmitter.emit('match.result', {
                            player: {
                                id: winnerPlayer.id,
                                rank: winnerPlayer.rank,
                            },
                        });
                        this.eventEmitter.emit('match.result', {
                            player: {
                                id: loserPlayer.id,
                                rank: loserPlayer.rank,
                            },
                        });
                        return this.matchRepository.save(match);
                    })
                    .then(() => callback(null))
                    .catch(error => callback(error));
            });
        });
    }
    private calculateScore(rankA: number, rankB: number): number {
        return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
    }
}