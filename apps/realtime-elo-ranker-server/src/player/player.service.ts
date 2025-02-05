import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Player } from '../entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from '../player/dto/create-player-dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private PlayerRepository: Repository<Player>,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    findAll(callback: (error: any, result: Player[] | null) => void): void {
        this.PlayerRepository.find()
            .then(players => callback(null, players))
            .catch(error => callback(error, null));
    }

    findOne(id: string, callback: (error: any, result: Player | null) => void): void {
        this.PlayerRepository.findOneBy({ id })
            .then(player => {
                if (!player) {
                    callback(new Error('Player not found'), null);
                } else {
                    callback(null, player);
                }
            })
            .catch(error => callback(error, null));
    }

    create(player: CreatePlayerDto, callback: (error: any, result: Player | null) => void): void {
        if (player.id === '') {
            callback(new Error('Player id is not valid'), null);
            return;
        }
        player.rank = 1000;
        this.PlayerRepository.save(player)
            .then(savedPlayer => {
                this.eventEmitter.emit('player.created', savedPlayer);
                callback(null, savedPlayer);
            })
            .catch(error => callback(error, null));
    }

    remove(id: string, callback: (error: any) => void): void {
        this.findOne(id, (error, player) => {
            if (error) {
                callback(error);
                return;
            }
            if (player) {
                this.PlayerRepository.remove(player)
                    .then(() => {
                        this.eventEmitter.emit('player.removed', player);
                        callback(null);
                    })
                    .catch(error => callback(error));
            } else {
                callback(new Error('Player not found'));
            }
        });
    }
}