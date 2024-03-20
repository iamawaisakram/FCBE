import { Space } from 'src/space/space.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class SpacePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  space_id: number;

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
  @ManyToOne(() => Space, space => space.permissions)
  space: Space;
}
