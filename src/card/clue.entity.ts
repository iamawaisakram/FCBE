import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Clue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Card, (card) => card.clues)
  card: Card;
}
