import { User } from './../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Twit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  message: string;

  @ManyToOne((type) => User, (user) => user.twits, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
