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
    createMatch(@Body() match: CreateMatchDto, @Res() res: Response): void {
        this.matchService.createMatch(match, (error) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.status(200).send('Match created');
            }
        });
    }    
}
