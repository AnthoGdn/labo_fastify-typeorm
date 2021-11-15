import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Team } from './team';

@Entity()
export class Player {
  constructor(
    id: string,
    number: number,
    name: string,
    lastName: string,
    position: string,
    isCaptain: boolean
  ) {
    this.id = id;
    this.number = number;
    this.name = name;
    this.lastName = lastName;
    this.position = position;
    this.isCaptain = isCaptain;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Team, (team) => team.players)
  @JoinColumn()
  team: Team;

  @Column()
  number: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  position: string;

  @Column()
  isCaptain: boolean;
}
