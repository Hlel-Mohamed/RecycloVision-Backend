"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_1 = require("../middleware/authorization");
const router = express_1.default.Router();
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
router.post("/create", user_controller_1.UserController.create);
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
router.post("/add", user_controller_1.UserController.addUser);
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
router.get("/", auth_middleware_1.auth, (0, authorization_1.authorization)(["Admin"]), user_controller_1.UserController.getAll);
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
router.get("/recyclers", auth_middleware_1.auth, (0, authorization_1.authorization)(["Admin"]), user_controller_1.UserController.getRecyclers);
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
router.get("/admins", auth_middleware_1.auth, (0, authorization_1.authorization)(["Admin"]), user_controller_1.UserController.getAdmins);
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
router.get("/recyclers/count", auth_middleware_1.auth, (0, authorization_1.authorization)(["Admin"]), user_controller_1.UserController.getRecyclersCount);
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
router.get("/admins/count", auth_middleware_1.auth, (0, authorization_1.authorization)(["Admin"]), user_controller_1.UserController.getAdminsCount);
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
router.put("/makeAdmin/:id", auth_middleware_1.auth, (0, authorization_1.authorization)(["Admin"]), user_controller_1.UserController.makeAdmin);
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
router.put("/updateProfile", auth_middleware_1.auth, user_controller_1.UserController.updateProfile);
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
router.put("/update/:id", auth_middleware_1.auth, (0, authorization_1.authorization)(["Admin"]), user_controller_1.UserController.updateUser);
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
router.delete("/delete/:id", auth_middleware_1.auth, (0, authorization_1.authorization)(["Admin"]), user_controller_1.UserController.deleteUser);
router.get('/:id', user_controller_1.UserController.getUserById);
exports.default = router;
