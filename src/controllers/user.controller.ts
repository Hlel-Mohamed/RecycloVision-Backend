import { Request, Response } from "express"
import { encrypt } from "../helpers/helpers"
import { User } from "../schemas/User"

export class UserController {
  /**
   * Creates a new user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with a success message or error.
   */
  static async create(req: Request, res: Response) {
    const email = req.body.email
    const phone = req.body.phone
    if (!/^\d+$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number" })
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const { firstName, lastName, password } = req.body
    const encryptedPassword = await encrypt.encryptpass(password)
    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.phone = phone
    user.password = encryptedPassword
    user.role = "Recycler"

    await User.save(user)

    const { password: _, createdAt, updatedAt, ...result } = user
    return res.status(200).json({ message: "User created successfully", user: result })
  }

  /**
   * Adds a new user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with a success message or error.
   */
  static async addUser(req: Request, res: Response) {
    const email = req.body.email
    const phone = req.body.phone
    if (!/^\d+$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number" })
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const { firstName, lastName, password } = req.body
    const encryptedPassword = await encrypt.encryptpass(password)
    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.phone = phone
    user.password = encryptedPassword
    user.role = "Recycler"

    await User.save(user)
    return res.status(200).json({ message: "User created successfully" })
  }

  /**
   * Makes a user an admin.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with a success message or error.
   */
  static async makeAdmin(req: Request, res: Response) {
    const id = req.params.id
    const user = await User.findOne({ where: { id } })
    if (user) {
      user.role = "Admin"
      await User.save(user)
      return res.status(200).json({ message: `User ${user.firstName} ${user.lastName} is now an Admin` })
    }
    return res.status(404).json("User not found")
  }

  /**
   * Gets all users.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with the list of users.
   */
  static async getAll(req: Request, res: Response) {
    const users = await User.find()
    const usersData = users.map(user => {
      const { password, createdAt, updatedAt, ...data } = user
      return data
    })
    return res.status(200).json({ data: usersData })
  }

  /**
   * Gets a user by ID.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with the user data or error.
   */
  static async getUserById(req: Request, res: Response) {
    const id = req.params.id
    const user = await User.findOne({ where: { id } })
    return user ? res.status(200).json(user) : res.status(404).json("User not found")
  }

  /**
   * Gets all recyclers.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with the list of recyclers.
   */
  static async getRecyclers(req: Request, res: Response) {
    const users = await User.find({ where: { role: "Recycler" } })
    const usersData = users.map(user => {
      const { password, createdAt, updatedAt, ...data } = user
      return data
    })
    return res.status(200).json({ data: usersData })
  }

  /**
   * Gets all admins.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with the list of admins.
   */
  static async getAdmins(req: Request, res: Response) {
    const users = await User.find({ where: { role: "Admin" } })
    const usersData = users.map(user => {
      const { password, createdAt, updatedAt, ...data } = user
      return data
    })
    return res.status(200).json({ data: usersData })
  }

  /**
   * Gets the count of recyclers.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with the count of recyclers.
   */
  static async getRecyclersCount(req: Request, res: Response) {
    const userCount = await User.count({ where: { role: "Recycler" } })
    return res.status(200).json({ data: userCount })
  }

  /**
   * Gets the count of admins.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with the count of admins.
   */
  static async getAdminsCount(req: Request, res: Response) {
    const adminCount = await User.count({ where: { role: "Admin" } })
    return res.status(200).json({ data: adminCount })
  }

  /**
   * Updates the profile of the authenticated user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with a success message or error.
   */
  static async updateProfile(req: any, res: Response) {
    const id = req.authUser.id
    const { firstName, lastName, phone } = req.body
    const user = await User.findOne({ where: { id } })
    if (user) {
      user.firstName = firstName
      user.lastName = lastName
      user.phone = phone
      await User.save(user)
      res.status(200).json({ message: "Profile updated successfully" })
    } else {
      res.status(404).json("User not found")
    }
  }

  /**
   * Updates a user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with a success message or error.
   */
  static async updateUser(req: Request, res: Response) {
    const id = req.params.id
    const user = await User.findOne({ where: { id } })
    if (user) {
      const { email } = req.body
      const existEmail = await User.findOne({ where: { email } })
      if (existEmail && existEmail.id !== user.id) {
        return res.status(400).json({ message: "Email already exists" })
      }
      const { firstName, lastName, phone } = req.body
      user.firstName = firstName
      user.lastName = lastName
      user.phone = phone
      user.email = email
      await User.save(user)
      res.status(200).json({ message: "User updated successfully" })
    } else {
      res.status(404).json("User not found")
    }
  }

  /**
   * Deletes a user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} - The response object with a success message or error.
   */
  static async deleteUser(req: Request, res: Response) {
    const id = req.params.id
    const user = await User.findOne({ where: { id } })
    if (user) {
      await User.remove(user)
      res.status(200).json({ message: "User deleted successfully" })
    } else {
      res.status(404).json("User not found")
    }
  }
}