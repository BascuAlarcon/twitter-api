import { IsObject, IsString } from 'class-validator';

import { User } from './../../users/entities/user.entity';

export class CreateTwitDto {
  @IsString()
  readonly message: string;

  @IsObject()
  readonly user: Partial<User>;
}
