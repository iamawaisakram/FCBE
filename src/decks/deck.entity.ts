import { UserSpaceDeckCard } from 'src/card/user-space-deck-card.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserSpaceDeckCard, userSpaceDeckCard => userSpaceDeckCard.deck)
  userSpaceDeckCards: UserSpaceDeckCard[];
}
