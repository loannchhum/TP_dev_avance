import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match } from '../entities/match.entity';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../player/player.service';
import { CreateMatchDto } from './dto/create-match-dto';

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

    async findAll(): Promise<Match[]> {
        return this.matchRepository.find();
      }
    
      async findOne(id: number): Promise<Match | null> {
        return this.matchRepository.findOneBy({ id });
      }

    createMatch(matchDto: CreateMatchDto, callback: (error: any) => void): void {
        const { winner, loser, draw } = matchDto;

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
                    const scoreWinner = this.Score(winnerPlayer.rank, loserPlayer.rank);
                    const scoreLoser = this.Score(loserPlayer.rank, winnerPlayer.rank);

                    winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (0.5 - scoreWinner));
                    loserPlayer.rank = Math.round(loserPlayer.rank + K * (0.5 - scoreLoser));
                } else {
                    const scoreWinner = this.Score(winnerPlayer.rank, loserPlayer.rank);
                    const scoreLoser = this.Score(loserPlayer.rank, winnerPlayer.rank);

                    winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (1 - scoreWinner));
                    loserPlayer.rank = Math.round(loserPlayer.rank + K * (0 - scoreLoser));
                }

                this.playerRepository.save(winnerPlayer)
                    .then(() => this.playerRepository.save(loserPlayer))
                    .then(() => {
                        const match = new Match();
                        match.winner = winnerPlayer.id;
                        match.loser = loserPlayer.id;
                        match.draw = draw;
                        return this.matchRepository.save(match);
                    })
                    .then((savedMatch) => {
                        this.eventEmitter.emit('match.result', {
                            player: {
                                id: winnerPlayer.id,
                                rank: winnerPlayer.rank,
                            }
                        });
                        console.log('match.result emit pour le gagnant:', winnerPlayer);
                        this.eventEmitter.emit('match.result', {
                            player: {
                                id: loserPlayer.id,
                                rank: loserPlayer.rank,
                            }
                        });
                        console.log('match.result emit pour le perdant:', loserPlayer);
                        const updateMatchDto: CreateMatchDto = {
                            winner: winnerPlayer.id,
                            loser: loserPlayer.id,
                            draw: savedMatch.draw,
                        };

                        this.eventEmitter.emit('match.result', updateMatchDto);
                    })
                    .catch(error => callback(error));
            });
        });
    }
    private Score(rankA: number, rankB: number): number {
        return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
    }
}