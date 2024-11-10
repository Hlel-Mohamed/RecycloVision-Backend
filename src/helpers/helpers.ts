import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import "dotenv/config"
import { UserResponse } from "../dto/user.dto"

const { JWT_SECRET = "" } = process.env

export class encrypt {
  /**
   * Encrypts a password using bcrypt.
   *
   * @param {string} password - The password to encrypt.
   * @returns {Promise<string>} - The encrypted password.
   */
  static async encryptpass(password: string): Promise<string> {
    return bcrypt.hashSync(password, 12)
  }

  /**
   * Compares a password with a hashed password.
   *
   * @param {string} hashPassword - The hashed password.
   * @param {string} password - The plain text password.
   * @returns {boolean} - True if the passwords match, false otherwise.
   */
  static comparepassword(hashPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, hashPassword)
  }

  /**
   * Generates a JWT token.
   *
   * @param {UserResponse} payload - The payload to include in the token.
   * @returns {string} - The generated JWT token.
   */
  static generateToken(payload: UserResponse): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
  }
}