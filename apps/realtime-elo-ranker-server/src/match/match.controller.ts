import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from '../entities/match.entity';
import { Response } from 'express';
import { CreateMatchDto } from './dto/create-match-dto';

@Controller('api/match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Get()
    findAll(): Promise<Match[]> {
      return this.matchService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Match | null> {
      return this.matchService.findOne(+id);
    }

    @Post()
    async createMatch(@Body() matchdto: CreateMatchDto, @Res() res: Response): Promise<any> {
        try {
            await new Promise<void>((resolve, reject) => {
                this.matchService.createMatch(matchdto, (error: any, result?: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        res.status(200).json(result);
                        resolve();
                    }
                });
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
