import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'name', nullable: false})
  name: string;

  @Column({name: 'email', nullable: false})
  email: string;
}
