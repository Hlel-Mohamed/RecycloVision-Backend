import { NextFunction, Response } from "express"
import { User } from "../schemas/User"

/**
 * Middleware to authorize a user based on their role.
 *
 * @param {string[]} roles - The roles that are allowed to access the route.
 * @returns {Function} - The middleware function to authorize the user.
 */
export const authorization = (roles: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const user = await User.findOneBy({
      id: req["authUser"].id,
    })
    if (!user) return res.status(404).json({ message: "User not found" })
    if (!roles.includes(user.role))
      return res.status(403).json({ message: "Forbidden" })

    next()
  }
}