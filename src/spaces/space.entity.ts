// // src/spaces/space.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User } from '../user/user.entity';

// @Entity()
// export class Space {
//   @PrimaryGeneratedColumn()
//   spaceID: number;

//   @Column()
//   spaceName: string;

//   @ManyToOne(() => User, (user) => user.spaces)
//   user: User;

//   @Column({ default: () => 'CURRENT_TIMESTAMP' })
//   created_at: Date;
// }
