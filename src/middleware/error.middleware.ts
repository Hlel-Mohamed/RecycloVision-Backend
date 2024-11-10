import { NextFunction, Request, Response } from "express"

/**
 * Error handling middleware for Express.
 *
 * @param {Error} error - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Response} - Returns a 500 response with an error message.
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.error(`Error: ${error.message}`)
  return res.status(500).json({ message: "Internal server error" })
}