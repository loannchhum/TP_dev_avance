import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingService } from './ranking.service';
import { Player } from '../entities/player.entity';
import { PlayerModule } from '../player/player.module';
import { RankingController } from './ranking.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    PlayerModule,
  ],
  providers: [RankingService],
  controllers: [RankingController],
  exports: [RankingService],
})
export class RankingModule {}