import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "products" })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ type: "decimal", nullable: false })
    price: number;

    @Column({ type: "int", nullable: false })
    coins: number;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}