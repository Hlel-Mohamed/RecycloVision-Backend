import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "orders" })
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("simple-json")
    items: { productId: string; name: string; quantity: number; price: number; coins: number }[];

    @Column({ type: "decimal" })
    totalAmount: number;

    @Column({ type: "int" })
    totalCoins: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column()
    userId: string;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}