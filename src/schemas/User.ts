import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm"

/**
 * User entity representing a user in the system.
 *
 * @class
 * @extends BaseEntity
 */
@Entity({ name: "users" })
export class User extends BaseEntity {
  /**
   * Unique identifier for the user.
   *
   * @type {string}
   */
  @PrimaryGeneratedColumn("uuid")
  id: string

  /**
   * First name of the user.
   *
   * @type {string}
   */
  @Column({ nullable: false })
  firstName: string

  /**
   * Last name of the user.
   *
   * @type {string}
   */
  @Column({ nullable: false })
  lastName: string

  /**
   * Phone number of the user.
   *
   * @type {string}
   */
  @Column({ nullable: false })
  phone: string

  /**
   * Email address of the user.
   *
   * @type {string}
   */
  @Column({ nullable: false })
  email: string

  /**
   * Encrypted password of the user.
   *
   * @type {string}
   */
  @Column({ nullable: false })
  password: string

  /**
   * Role of the user (e.g., Recycler, Admin).
   *
   * @type {string}
   * @default "Recycler"
   */
  @Column({ default: "Recycler" })
  role: string

  /**
   * Timestamp when the user was created.
   *
   * @type {Date}
   */
  @CreateDateColumn()
  createdAt: Date

  /**
   * Timestamp when the user was last updated.
   *
   * @type {Date}
   */
  @UpdateDateColumn()
  updatedAt: Date
}