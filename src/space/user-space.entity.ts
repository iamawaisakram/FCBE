import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from 'src/user/user.entity';
import { Space } from './space.entity';

@Entity('user_space')
export class UserSpace {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.spaces)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Space, (space) => space.users)
  @JoinColumn({ name: 'space_id' })
  space: Space;
}
