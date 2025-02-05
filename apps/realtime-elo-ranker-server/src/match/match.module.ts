import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { Match } from '../entities/match.entity';
import { PlayerService } from '../player/player.service';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Player, Match])],
    providers: [MatchService, PlayerService],
    controllers: [MatchController],
})
export class MatchModule {}