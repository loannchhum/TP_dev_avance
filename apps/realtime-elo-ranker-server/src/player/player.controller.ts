import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from '../entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class PlayerController {
    constructor(private readonly PlayerService: PlayerService) {}
  
    @Get('api/player')
    findAll(): Promise<Player[]> {
      return new Promise<Player[]>((resolve, reject) => {
        this.PlayerService.findAll((error, players) => {
          if (error) {
            reject(error);
          } else if (players) {
            resolve(players);
          } else {
            reject(new Error('No players found'));
          }
        });
      });
    }
  
    @Get('api/player:id')
    findOne(@Param('id') id: string): Promise<Player> {
      return new Promise<Player>((resolve, reject) => {
        this.PlayerService.findOne(id, (error, player) => {
          if (error) {
            reject(error);
          } else if (player) {
            resolve(player);
          } else {
            reject(new Error('Player not found'));
          }
        });
      });
    }
  
    @Post('api/player')
    create(@Body() Player: Player): Promise<Player> {
      return new Promise<Player>((resolve, reject) => {
        this.PlayerService.create(Player, (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error('Player creation failed'));
          }
        });
      });
    }
  
    @Delete('api/player:id')
    remove(@Param('id') id: string): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        this.PlayerService.remove(id, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }

    @Get('api/ranking')
    getRanking(): Promise<Player[]> {
      return new Promise<Player[]>((resolve, reject) => {
        this.PlayerService.findAll((error, players) => {
          if (error) {
            reject(error);
          } else if (players) {
            resolve(players);
          } else {
            reject(new Error('No players found'));
          }
        });
      });
    }
}
