import { Controller, Get, Post, Res, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';
import { Response } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { fromEvent, map, Observable, merge } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { merge as rxjsMerge } from 'rxjs';

@Controller('api/ranking')
export class RankingController {
    constructor(private readonly rankingService: RankingService, 
        private readonly eventEmitter: EventEmitter2
    ) {}

    // @Get()
    // async getRankings(): Promise<Player[]> {

    //     return await this.rankingService.getRankings();
    // }

    @Get()
    getRankings(@Res() res: Response): void {
        this.rankingService.getRankings((error, players) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                if (players) {
                    players.sort((a, b) => b.rank - a.rank);
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

        const matchUpdate = fromEvent(this.eventEmitter, 'match.result').pipe(
            map((event: { player: Player }) => {
                return <MessageEvent>{
                    data: {
                        type: 'RankingUpdate',
                        player: event.player,
                    },
                };
            })
        );
        return merge(playerCreated, matchUpdate);
    }
}
