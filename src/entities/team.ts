import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Player } from './player';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150
  })
  coach: string;

  @Column({
    type: 'int'
  })
  year: number;

  @OneToMany(() => Player, (player) => player.team)
  @JoinColumn()
  players: Player[];
}
