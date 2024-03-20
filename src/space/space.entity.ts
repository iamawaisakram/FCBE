import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserSpace } from './user-space.entity';
import { UserSpaceDeck } from 'src/decks/user-space-deck.entity';
@Entity('space')
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => UserSpace, (userSpace) => userSpace.space)
  userSpaces: UserSpace[];
  users: any;

  @OneToMany(() => UserSpaceDeck, (userSpaceDeck) => userSpaceDeck.space)
  userSpacesDecks: UserSpaceDeck[];
    ownerId: number;
    permissions: any;
}
