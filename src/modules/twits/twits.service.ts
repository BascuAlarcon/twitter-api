import { User } from './../users/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateTwitDto, CreateTwitDto } from './dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Twit } from './twuit.entity';

@Injectable()
export class TwitsService {
  constructor(
    @InjectRepository(Twit) private readonly twitRepository: Repository<Twit>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getTwits({ limit, offset }: PaginationQueryDto): Promise<Twit[]> {
    return await this.twitRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  async getTwit(id: number): Promise<Twit> {
    const twit: Twit[] = await this.twitRepository.find({
      relations: { user: true },
      where: { id: id },
    });

    if (!twit) {
      throw new NotFoundException('Resource not found');
    }

    return twit[0];
  }

  async createTwit({ message, user }: CreateTwitDto) {
    const twit: Twit = this.twitRepository.create({ message, user });
    return this.twitRepository.save(twit);
  }

  async updateTwit(id: number, { message }: UpdateTwitDto) {
    const twit: Twit = await this.twitRepository.preload({
      id,
      message,
    });
    if (!twit) {
      throw new NotFoundException('Resource not found');
    }

    return this.twitRepository.save(twit);
  }

  async removeTwit(id: number): Promise<void> {
    const twit: Twit = await this.twitRepository.findOne({ where: { id: id } });

    if (!twit) {
      throw new NotFoundException('Resource not found');
    }

    this.twitRepository.remove(twit);
  }
}
