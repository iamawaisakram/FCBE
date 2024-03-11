import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';
import { Clue } from './clue.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Answer, (answer) => answer.card)
  answers: Answer[];

  @OneToMany(() => Clue, (clue) => clue.card)
  clues: Clue[];
}
