import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {Team} from "./team";

@Entity()
export class Player {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Team, team => team.players)
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
