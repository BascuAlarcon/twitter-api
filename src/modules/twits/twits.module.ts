import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TwitsService } from './twits.service';
import { TwitsController } from './twits.controller';
import { Twit } from './twuit.entity';
import { User } from './../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Twit, User])],
  controllers: [TwitsController],
  providers: [TwitsService],
})
export class TwitsModule {}
