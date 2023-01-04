import { IsString } from 'class-validator';

export class UpdateTwitDto {
  @IsString()
  readonly message: string;
}
