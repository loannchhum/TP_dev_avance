import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { Player } from '../entities/player.entity';
import { PlayerController } from './player.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [PlayerService],
    controllers: [PlayerController],
  exports: [PlayerService],
})
export class PlayerModule {}
