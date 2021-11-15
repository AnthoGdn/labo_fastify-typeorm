import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 150
  })
  lastName: string;
}
