import { NextFunction, Response } from "express"
import * as jwt from "jsonwebtoken"
import "dotenv/config"

/**
 * Middleware to authenticate a user based on a JWT token.
 *
 * @param {any} req - The request object, which should contain the token in the headers.
 * @param {Response} res - The response object used to send back the appropriate HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Response|void} - Returns a 401 response if authentication fails, otherwise calls the next middleware.
 */
export const auth = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers["token"]
  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET || "")
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  req["authUser"] = decode
  next()
}