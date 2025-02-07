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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("../entities/player.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
let PlayerService = class PlayerService {
    constructor(PlayerRepository, eventEmitter) {
        this.PlayerRepository = PlayerRepository;
        this.eventEmitter = eventEmitter;
    }
    findAll(callback) {
        this.PlayerRepository.find()
            .then(players => callback(null, players))
            .catch(error => callback(error, null));
    }
    findOne(id, callback) {
        this.PlayerRepository.findOneBy({ id })
            .then(player => {
            if (!player) {
                callback(new Error('Player not found'), null);
            }
            else {
                callback(null, player);
            }
        })
            .catch(error => callback(error, null));
    }
    create(player, callback) {
        if (player.id === '') {
            callback(new Error('Player id is not valid'), null);
            return;
        }
        this.PlayerRepository.find()
            .then(players => {
            const totalRank = players.reduce((sum, p) => sum + p.rank, 0);
            const averageRank = Math.round(players.length > 0 ? totalRank / players.length : 1000);
            player.rank = averageRank;
        })
            .catch(error => {
            callback(error, null);
            return;
        });
        this.PlayerRepository.save(player)
            .then(savedPlayer => {
            this.eventEmitter.emit('player.created', {
                player: {
                    id: savedPlayer.id,
                    rank: savedPlayer.rank,
                }
            });
            callback(null, savedPlayer);
        })
            .catch(error => callback(error, null));
    }
    remove(id, callback) {
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
            }
            else {
                callback(new Error('Player not found'));
            }
        });
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], PlayerService);
//# sourceMappingURL=player.service.js.map