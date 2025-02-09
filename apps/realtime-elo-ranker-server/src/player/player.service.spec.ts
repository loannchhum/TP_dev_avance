import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Player } from '../entities/player.entity';
import { CreatePlayerDto } from './dto/create-player-dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlayerService', () => {
    let playerService: PlayerService;
    let playerRepository: Repository<Player>;
    let eventEmitter: EventEmitter2;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlayerService,
                {
                    provide: getRepositoryToken(Player),
                    useValue: {
                        find: jest.fn(),
                        save: jest.fn(),
                        remove: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
                EventEmitter2,
            ],
        }).compile();

        playerService = module.get<PlayerService>(PlayerService);
        playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
        eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    });

    it('devrait être défini', () => {
        expect(playerService).toBeDefined();
    });

    it("devrait retourner une erreur si l'identifiant du joueur est vide", (done) => {
        const playerDto: CreatePlayerDto = { id: '', rank: 1000 };

        playerService.create(playerDto, (error, result) => {
            expect(error).toBeInstanceOf(Error);
            expect(result).toBeNull();
            expect(error.message).toBe('Player id is not valid');
            done();
        });
    });

    it('devrait créer un joueur et émettre un événement', (done) => {
        const playerDto: CreatePlayerDto = { id: '1', rank: 1000 };
        const existingPlayers = [
            { id: 'a', rank: 800 },
            { id: 'b', rank: 1200 },
        ];

        jest.spyOn(playerRepository, 'find').mockResolvedValue(existingPlayers);
        jest.spyOn(playerRepository, 'save').mockResolvedValue(playerDto);
        jest.spyOn(eventEmitter, 'emit');

        playerService.create(playerDto, (error, result) => {
            expect(error).toBeNull();
            expect(result).toEqual(playerDto);
            expect(eventEmitter.emit).toHaveBeenCalledWith('player.created', {
                player: { id: '1', rank: 1000 },
            });
            done();
        });
    });

    it('devrait retourner une erreur si la sauvegarde du joueur échoue', (done) => {
        const playerDto: CreatePlayerDto = { id: '1', rank: 1000 };
        const error = new Error('Failed to save player');

        jest.spyOn(playerRepository, 'find').mockResolvedValue([]);
        jest.spyOn(playerRepository, 'save').mockRejectedValue(error);

        playerService.create(playerDto, (err, result) => {
            expect(err).toBe(error);
            expect(result).toBeNull();
            done();
        });
    });
});