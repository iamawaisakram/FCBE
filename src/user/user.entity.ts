import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Space } from '../spaces/space.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // @OneToMany(() => Space, (space) => space.user)
  // spaces: Space[];
}
