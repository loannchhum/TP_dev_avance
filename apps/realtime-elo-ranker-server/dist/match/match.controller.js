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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const create_match_dto_1 = require("./dto/create-match-dto");
let MatchController = class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }
    findAll() {
        return this.matchService.findAll();
    }
    findOne(id) {
        return this.matchService.findOne(+id);
    }
    createMatch(match, res) {
        this.matchService.createMatch(match, (error) => {
            if (error) {
                res.status(500).send(error.message);
            }
            else {
                res.status(200).send('Match created');
            }
        });
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_match_dto_1.CreateMatchDto, Object]),
    __metadata("design:returntype", void 0)
], MatchController.prototype, "createMatch", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)('api/match'),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
//# sourceMappingURL=match.controller.js.map