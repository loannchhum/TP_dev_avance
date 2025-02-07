import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from '../entities/match.entity';
import { Player } from '../entities/player.entity';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PlayerService } from '../player/player.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        TypeOrmModule.forFeature([Match, Player]),
        EventEmitterModule.forRoot(),
    ],
    providers: [MatchService, PlayerService],
    controllers: [MatchController],
})
export class MatchModule {}