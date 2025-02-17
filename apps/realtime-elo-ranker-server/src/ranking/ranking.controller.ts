import { Controller, Get, Post, Res, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';
import { Response } from 'express';
import { fromEvent, map, Observable, merge } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('api/ranking')
export class RankingController {
    constructor(private readonly rankingService: RankingService, 
        private readonly eventEmitter: EventEmitter2
    ) {}

    @Get()
    getRankings(@Res() res: Response): void {
        this.rankingService.getRankings((error, players) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                if (players) {
                    players.sort((a, b) => a.rank - b.rank);
                    res.status(200).json(players);
                } else {
                    res.status(200).json([]);
                }
            }
        });
    }

    @Sse('events')
    sse(): Observable<MessageEvent> {
        const playerCreated = fromEvent(this.eventEmitter, 'player.created').pipe(
            map((event: { player: Player }) => {
                return <MessageEvent>{
                    data: {
                        type: 'RankingUpdate',
                        player: event.player,
                    },
                };
            })
        );

        const matchResult = fromEvent(this.eventEmitter, 'match.result').pipe(
            map((event: { player: Player }) => {
                console.log('match.result recu', event);
                return <MessageEvent>{
                    data: {
                        type: 'RankingUpdate',
                        player: event.player,
                    },
                };
            })
        );
        return merge(playerCreated, matchResult);
    }
}
