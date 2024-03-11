import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from 'src/user/user.entity';
import { Space } from 'src/space/space.entity';
import { Deck } from './deck.entity';

@Entity()
export class UserSpaceDeck {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Space, (space) => space.userSpacesDecks)
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @ManyToOne(() => Deck)
  @JoinColumn({ name: 'deck_id' })
  deck: Deck;
}
