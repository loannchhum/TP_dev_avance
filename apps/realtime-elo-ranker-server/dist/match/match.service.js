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
const match_entity_1 = require("../entities/match.entity");
const player_entity_1 = require("../entities/player.entity");
const player_service_1 = require("../player/player.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let MatchService = class MatchService {
    constructor(playerRepository, matchRepository, playerService) {
        this.playerRepository = playerRepository;
        this.matchRepository = matchRepository;
        this.playerService = playerService;
    }
    async MAJElo(match) {
        const { winner, loser, draw } = match;
        const winnerPlayer = await this.playerService.findOne(winner);
        const loserPlayer = await this.playerService.findOne(loser);
        if (!winnerPlayer || !loserPlayer) {
            throw new Error('Player not found');
        }
        const K = 32;
        if (draw) {
            const expectedScoreWinner = this.calculateExpectedScore(winnerPlayer.rank, loserPlayer.rank);
            const expectedScoreLoser = this.calculateExpectedScore(loserPlayer.rank, winnerPlayer.rank);
            winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (0.5 - expectedScoreWinner));
            loserPlayer.rank = Math.round(loserPlayer.rank + K * (0.5 - expectedScoreLoser));
        }
        else {
            const expectedScoreWinner = this.calculateExpectedScore(winnerPlayer.rank, loserPlayer.rank);
            const expectedScoreLoser = this.calculateExpectedScore(loserPlayer.rank, winnerPlayer.rank);
            winnerPlayer.rank = Math.round(winnerPlayer.rank + K * (1 - expectedScoreWinner));
            loserPlayer.rank = Math.round(loserPlayer.rank + K * (0 - expectedScoreLoser));
        }
        await this.playerRepository.save(winnerPlayer);
        await this.playerRepository.save(loserPlayer);
        await this.matchRepository.save(match);
    }
    calculateExpectedScore(rankA, rankB) {
        return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __param(1, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        player_service_1.PlayerService])
], MatchService);
//# sourceMappingURL=match.service.js.map