import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';
import { Player } from '../entities/player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerService } from '../player/player.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('MatchService', () => {
    let service: MatchService;
    let matchRepo: Repository<Match>;
    let playerRepo: Repository<Player>;
    let playerService: PlayerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MatchService,
                {
                    provide: getRepositoryToken(Match),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Player),
                    useClass: Repository,
                },
                {
                    provide: PlayerService,
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
                EventEmitter2,
            ],
        }).compile();

        service = module.get<MatchService>(MatchService);
        matchRepo = module.get<Repository<Match>>(getRepositoryToken(Match));
        playerRepo = module.get<Repository<Player>>(getRepositoryToken(Player));
        playerService = module.get<PlayerService>(PlayerService);
    });

    it('devrait être défini', () => {
        expect(service).toBeDefined();
    });

    it('devrait retourner un tableau vide lorsqu\'aucun match n\'existe', async () => {
        jest.spyOn(matchRepo, 'find').mockResolvedValue([]);
        const matches = await service.findAll();
        expect(matches).toEqual([]);
    });

    it('devrait retourner un match par ID', async () => {
        const match = new Match();
        match.id = 1;
        match.winner = '123';
        match.loser = '456';

        jest.spyOn(matchRepo, 'findOneBy').mockResolvedValue(match);
        const foundMatch = await service.findOne(1);

        expect(foundMatch).toEqual(match);
    });
});