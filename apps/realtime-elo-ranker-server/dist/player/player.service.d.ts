import { Player } from '../entities/player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from '../player/dto/create-player-dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PlayerService {
    private PlayerRepository;
    private readonly eventEmitter;
    constructor(PlayerRepository: Repository<Player>, eventEmitter: EventEmitter2);
    findAll(callback: (error: any, result: Player[] | null) => void): void;
    findOne(id: string, callback: (error: any, result: Player | null) => void): void;
    create(player: CreatePlayerDto, callback: (error: any, result: Player | null) => void): void;
    remove(id: string, callback: (error: any) => void): void;
}
