import express from "express"
import { UserController } from "../controllers/user.controller"
import { auth } from "../middleware/auth.middleware"
import { authorization } from "../middleware/authorization"

const router = express.Router()



/**
 * Route to create a new user.
 *
 * @name POST /create
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.post("/create", UserController.create)


/**
 * Route to add a user.
 *
 * @name POST /add
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.post("/add", UserController.addUser)

/**
 * Route to get all users. Requires authentication and authorization.
 *
 * @name GET /
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.get("/", auth, authorization(["Admin"]), UserController.getAll)

/**
 * Route to get all recyclers. Requires authentication and authorization.
 *
 * @name GET /recyclers
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.get("/recyclers", auth, authorization(["Admin"]), UserController.getRecyclers)

/**
 * Route to get all admins. Requires authentication and authorization.
 *
 * @name GET /admins
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.get("/admins", auth, authorization(["Admin"]), UserController.getAdmins)

/**
 * Route to get the count of recyclers. Requires authentication and authorization.
 *
 * @name GET /recyclers/count
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.get("/recyclers/count", auth, authorization(["Admin"]), UserController.getRecyclersCount)

/**
 * Route to get the count of admins. Requires authentication and authorization.
 *
 * @name GET /admins/count
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.get("/admins/count", auth, authorization(["Admin"]), UserController.getAdminsCount)

/**
 * Route to make a user an admin. Requires authentication and authorization.
 *
 * @name PUT /makeAdmin/:id
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.put("/makeAdmin/:id", auth, authorization(["Admin"]), UserController.makeAdmin)

/**
 * Route to update the profile of the authenticated user.
 *
 * @name PUT /updateProfile
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.put("/updateProfile", auth, UserController.updateProfile)

/**
 * Route to update a user. Requires authentication and authorization.
 *
 * @name PUT /update/:id
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.put("/update/:id", auth, authorization(["Admin"]), UserController.updateUser)

/**
 * Route to delete a user. Requires authentication and authorization.
 *
 * @name DELETE /delete/:id
 * @function
 * @memberof module:routes/user
 * @inner
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.delete("/delete/:id", auth, authorization(["Admin"]), UserController.deleteUser)
router.get('/summary', UserController.getSummary);


router.get('/:id', UserController.getUserById);


export default router