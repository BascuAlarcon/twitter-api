import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Delete, Query } from '@nestjs/common/decorators';

import { PaginationQueryDto } from './dto/pagination-query.dto';
import { CreateTwitDto, UpdateTwitDto } from './dto';
import { Twit } from './twuit.entity';
import { TwitsService } from './twits.service';

@Controller('twits')
export class TwitsController {
  constructor(private readonly twitService: TwitsService) {}

  @Get()
  getTwits(@Query() pagination: PaginationQueryDto): Promise<Twit[]> {
    return this.twitService.getTwits(pagination);
  }

  @Get(':id')
  getTwit(@Param('id') id: number): Promise<Twit> {
    return this.twitService.getTwit(id);
  }

  @Post()
  createTwit(@Body() message: CreateTwitDto): Promise<Twit> {
    return this.twitService.createTwit(message);
  }

  @Patch(':id')
  updateTwit(
    @Param('id') id: number,
    @Body() twit: UpdateTwitDto,
  ): Promise<Twit> {
    return this.twitService.updateTwit(id, twit);
  }

  @Delete(':id')
  deleteTwit(@Param('id') id: number): Promise<void> {
    return this.twitService.removeTwit(id);
  }
}
