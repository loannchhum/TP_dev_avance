import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { Repository } from 'typeorm';

describe('RankingService', () => {
    let rankingService: RankingService;
    let playerRepository: Repository<Player>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RankingService,
                {
                    provide: getRepositoryToken(Player),
                    useValue: {
                        find: jest.fn(),
                    },
                },
            ],
        }).compile();

        rankingService = module.get<RankingService>(RankingService);
        playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
    });

    it('devrait être défini', () => {
        expect(rankingService).toBeDefined();
    });

    it('devrait retourner les classements triés par rang', (done) => {
        const players = [
            { id: 'a', rank: 1200 },
            { id: 'b', rank: 800 },
            { id: 'c', rank: 1000 },
        ];

        jest.spyOn(playerRepository, 'find').mockResolvedValue(players);

        rankingService.getRankings((error, result) => {
            expect(error).toBeNull();
            expect(result).toEqual([
                { id: 'b', rank: 800 },
                { id: 'c', rank: 1000 },
                { id: 'a', rank: 1200 },
            ]);
            done();
        });
    });

    it('devrait gérer l\'erreur lors de la récupération des classements', (done) => {
        const error = new Error('Erreur de base de données');

        jest.spyOn(playerRepository, 'find').mockRejectedValue(error);

        rankingService.getRankings((err, result) => {
            expect(err).toBe(error);
            expect(result).toBeNull();
            done();
        });
    });
});