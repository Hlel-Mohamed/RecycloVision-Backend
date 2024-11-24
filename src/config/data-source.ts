import { DataSource } from "typeorm"
import { User } from "../schemas/User"
import "dotenv/config"
import {Submission} from "../schemas/Submission";

/**
 * Initializes a new TypeORM DataSource instance for connecting to a MySQL database.
 * The configuration parameters are loaded from environment variables.
 *
 * @constant {DataSource} AppDataSource - The configured DataSource instance.
 * @property {string} type - The type of database (MySQL).
 * @property {string} host - The database host, loaded from the environment variable `DB_HOST`.
 * @property {number} port - The database port, loaded from the environment variable `DB_PORT`.
 * @property {string} username - The database username, loaded from the environment variable `DB_USER`.
 * @property {string} password - The database password, loaded from the environment variable `DB_PASSWORD`.
 * @property {string} database - The database name, loaded from the environment variable `DB_NAME`.
 * @property {boolean} synchronize - Indicates if the database schema should be auto-synced (true).
 * @property {boolean} logging - Indicates if logging is enabled (false).
 * @property {Array} entities - The list of entities to be used by the DataSource (includes User entity).
 * @property {Array} subscribers - The list of subscribers (empty array).
 * @property {Array} migrations - The list of migrations (empty array).
 */
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Submission],
  subscribers: [],
  migrations: [],
})