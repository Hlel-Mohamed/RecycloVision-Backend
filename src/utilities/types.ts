import { Request, Response } from "express"

/**
 * Type definition for a controller function in Express.
 *
 * @typedef {Function} Controller
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export type Controller = (req: Request, res: Response) => void