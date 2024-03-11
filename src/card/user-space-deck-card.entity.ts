import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from 'src/user/user.entity';
import { Space } from 'src/space/space.entity';
import { Deck } from 'src/decks/deck.entity';
import { Card } from './card.entity';

@Entity()
export class UserSpaceDeckCard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Space)
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @ManyToOne(() => Deck)
  @JoinColumn({ name: 'deck_id' })
  deck: Deck;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card;


}
