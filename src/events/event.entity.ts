import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity('entity', {name: 'event'})
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    when: Date;
    @Column()
    address: string;
}
