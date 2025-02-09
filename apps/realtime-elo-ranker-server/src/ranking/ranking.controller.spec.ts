import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from '../player/player.controller';
import { PlayerService } from '../player/player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';

describe('PlayerController', () => {
    let controller: PlayerController;
    let service: PlayerService;
    let playerRepository: Repository<Player>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayerController],
            providers: [
                PlayerService,
                {
                    provide: getRepositoryToken(Player),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        save: jest.fn(),
                        remove: jest.fn(),
                    },
                },
                EventEmitter2,
            ],
        }).compile();

        controller = module.get<PlayerController>(PlayerController);
        service = module.get<PlayerService>(PlayerService);
        playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});