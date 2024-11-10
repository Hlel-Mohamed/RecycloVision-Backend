import express from "express"
import { AuthController } from "../controllers/auth.controller"

const router = express.Router()

/**
 * Route to handle user login.
 *
 * @name POST /login
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.post("/login", AuthController.login)

export default router