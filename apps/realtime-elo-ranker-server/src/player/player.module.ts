import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Player } from '../entities/player.entity';
import { PlayerController } from './player.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    EventEmitterModule.forRoot(),
  ],
  providers: [PlayerService],
  controllers: [PlayerController],
  exports: [PlayerService],
})
export class PlayerModule {}
