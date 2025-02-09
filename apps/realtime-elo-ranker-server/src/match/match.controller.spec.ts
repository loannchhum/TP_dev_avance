import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchModule } from './match.module';
import { Match } from '../entities/match.entity';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match-dto';

describe('MatchController (e2e)', () => {
  let app: INestApplication;
  let matchService: MatchService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Match],
          synchronize: true,
        }),
        MatchModule,
      ],
    })
      .overrideProvider(MatchService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(null),
        createMatch: jest.fn((match: CreateMatchDto, callback: (error: any) => void) => {
          if (match.winner && match.loser) {
            callback(null);
          } else {
            callback(new Error('Invalid match data'));
          }
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    matchService = moduleFixture.get<MatchService>(MatchService);
  });

  it('/api/match (GET) devrait retourner une liste vide', async () => {
    return request(app.getHttpServer())
      .get('/api/match')
      .expect(200)
      .expect([]);
  });

  it('/api/match (POST) devrait creer un match', async () => {
    const newMatch: CreateMatchDto = { id: '1', winner: '123', loser: '456', draw: false };

    return request(app.getHttpServer())
      .post('/api/match')
      .send(newMatch)
      .expect(200)
      .expect('Match created');
  });

  it('/api/match (POST) devrait retourner 500 si les donnees sont invalides', async () => {
    const invalidMatch: CreateMatchDto = { id: '789', winner: '', loser: '', draw: false };

    return request(app.getHttpServer())
      .post('/api/match')
      .send(invalidMatch)
      .expect(500)
      .expect('Invalid match data');
  });

  afterAll(async () => {
    await app.close();
  });
});