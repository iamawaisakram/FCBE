import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CardPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  space_id: number;

  @Column()
  deck_id: number;

  @Column()
  card_id: number;

  @Column()
  user_id: number;

  @Column()
  owner_id: number;

  @Column()
  can_read: boolean;

  @Column()
  can_write: boolean;

  @Column()
  can_delete: boolean;

  @Column()
  can_create: boolean;

  @Column()
  show_space: boolean;

  @Column()
  show_deck: boolean;

  @Column()
  show_clue: boolean;
}
