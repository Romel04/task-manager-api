import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS= 'IN_PROGRESS',
    DONE = 'DONE'
}

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string ;

    @Column({nullable: true})
    description: string ;

    @Column({type: 'enum' , enum: TaskStatus , default: TaskStatus.OPEN})
    status : TaskStatus ;

    @ManyToOne(() => User, (user) => user.tasks, {eager: false})
    user: User;

    @Column()
    userId: number ;
}