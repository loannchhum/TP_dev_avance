"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const match_entity_1 = require("../entities/match.entity");
const player_entity_1 = require("../entities/player.entity");
const player_service_1 = require("../player/player.service");
let MatchService = class MatchService {
    constructor(matchRepository, playerRepository, playerService, eventEmitter) {
        this.matchRepository = matchRepository;
        this.playerRepository = playerRepository;
        this.playerService = playerService;
        this.eventEmitter = eventEmitter;
    }
    async findAll() {
        return this.matchRepository.find();
    }
    async findOne(id) {
        return this.matchRepository.findOneBy({ id });
    }
    createMatch(matchDto, callback) {
        const { winner, loser, draw } = matchDto;
        this.playerService.findOne(winner, (error, winnerPlayer) => {
            if (error || !winnerPlayer) {
                callback(error || new Error('Winner player not found'));
                return;
            }
            this.playerService.findOne(loser, (error, loserPlayer) => {
                if (error || !loserPlayer) {
                    callback(error || new Error('Loser player not found'));
                    return;
                }
                const K = 32;
                if (draw) {
                    const scoreWinner = this.Score(winnerPlayer.rank, loserPlayer.rank);
                    const scoreLoser = this.Score(loserPlayer.rank, winnerPlayer.rank);
                    winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (0.5 - scoreWinner));
                    loserPlayer.rank = Math.round(loserPlayer.rank + K * (0.5 - scoreLoser));
                }
                else {
                    const scoreWinner = this.Score(winnerPlayer.rank, loserPlayer.rank);
                    const scoreLoser = this.Score(loserPlayer.rank, winnerPlayer.rank);
                    winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (1 - scoreWinner));
                    loserPlayer.rank = Math.round(loserPlayer.rank + K * (0 - scoreLoser));
                }
                this.playerRepository.save(winnerPlayer)
                    .then(() => this.playerRepository.save(loserPlayer))
                    .then(() => {
                    const match = new match_entity_1.Match();
                    match.winner = winnerPlayer.id;
                    match.loser = loserPlayer.id;
                    match.draw = draw;
                    return this.matchRepository.save(match);
                })
                    .then((savedMatch) => {
                    this.eventEmitter.emit('match.result', {
                        player: {
                            id: winnerPlayer.id,
                            rank: winnerPlayer.rank,
                        }
                    });
                    console.log('match.result emit pour le gagnant:', winnerPlayer);
                    this.eventEmitter.emit('match.result', {
                        player: {
                            id: loserPlayer.id,
                            rank: loserPlayer.rank,
                        }
                    });
                    console.log('match.result emit pour le perdant:', loserPlayer);
                })
                    .catch(error => callback(error));
            });
        });
    }
    Score(rankA, rankB) {
        return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        player_service_1.PlayerService,
        event_emitter_1.EventEmitter2])
], MatchService);
//# sourceMappingURL=match.service.js.map