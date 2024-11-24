import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @Column({ type: 'blob', nullable: true })
    imageBlob: Buffer;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}