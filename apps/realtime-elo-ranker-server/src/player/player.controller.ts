import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from '../entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class PlayerController {
    constructor(private readonly PlayerService: PlayerService) {}
  
    @Get('api/player')
    findAll(): Promise<Player[]> {
      return this.PlayerService.findAll();
    }
  
    @Get('api/player:id')
    findOne(@Param('id') id: string): Promise<Player> {
      return this.PlayerService.findOne(id);
    }
  
    @Post('api/player')
    create(@Body() Player: Player): Promise<Player> {
      return this.PlayerService.create(Player);
    }
  
    @Delete('api/player:id')
    remove(@Param('id') id: string): Promise<void> {
      return this.PlayerService.remove(id);
    }

    @Get('api/ranking')
    getRanking(): Promise<Player[]> {
      return this.PlayerService.findAll();
    }
}
