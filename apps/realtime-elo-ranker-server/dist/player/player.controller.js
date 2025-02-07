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
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("./player.service");
const player_entity_1 = require("../entities/player.entity");
let PlayerController = class PlayerController {
    constructor(PlayerService) {
        this.PlayerService = PlayerService;
    }
    findAll() {
        return new Promise((resolve, reject) => {
            this.PlayerService.findAll((error, players) => {
                if (error) {
                    reject(error);
                }
                else if (players) {
                    resolve(players);
                }
                else {
                    reject(new Error('No players found'));
                }
            });
        });
    }
    findOne(id) {
        return new Promise((resolve, reject) => {
            this.PlayerService.findOne(id, (error, player) => {
                if (error) {
                    reject(error);
                }
                else if (player) {
                    resolve(player);
                }
                else {
                    reject(new Error('Player not found'));
                }
            });
        });
    }
    create(Player) {
        return new Promise((resolve, reject) => {
            this.PlayerService.create(Player, (error, result) => {
                if (error) {
                    reject(error);
                }
                else if (result) {
                    resolve(result);
                }
                else {
                    reject(new Error('Player creation failed'));
                }
            });
        });
    }
    remove(id) {
        return new Promise((resolve, reject) => {
            this.PlayerService.remove(id, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    getRanking() {
        return new Promise((resolve, reject) => {
            this.PlayerService.findAll((error, players) => {
                if (error) {
                    reject(error);
                }
                else if (players) {
                    resolve(players);
                }
                else {
                    reject(new Error('No players found'));
                }
            });
        });
    }
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_1.Get)('api/player'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('api/player:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('api/player'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [player_entity_1.Player]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('api/player:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('api/ranking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "getRanking", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map