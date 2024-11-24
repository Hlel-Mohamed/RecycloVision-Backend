import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'submissions' })
export class Submission extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('simple-array')
    items: string[];

    @Column('simple-array')
    images: string[];

    @Column({ type: 'int' })
    points: number;

    @Column({ default: 'Pending' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: string;
}