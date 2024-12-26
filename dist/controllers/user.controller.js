"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const helpers_1 = require("../helpers/helpers");
const User_1 = require("../schemas/User");
class UserController {
    /**
     * Creates a new user.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with a success message or error.
     */
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const phone = req.body.phone;
            if (!/^\d+$/.test(phone)) {
                return res.status(400).json({ message: "Invalid phone number" });
            }
            const existingUser = yield User_1.User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const { firstName, lastName, password } = req.body;
            const encryptedPassword = yield helpers_1.encrypt.encryptpass(password);
            const user = new User_1.User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.phone = phone;
            user.password = encryptedPassword;
            user.role = "Recycler";
            yield User_1.User.save(user);
            const { password: _, createdAt, updatedAt } = user, result = __rest(user, ["password", "createdAt", "updatedAt"]);
            return res.status(200).json({ message: "User created successfully", user: result });
        });
    }
    /**
     * Adds a new user.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with a success message or error.
     */
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const phone = req.body.phone;
            if (!/^\d+$/.test(phone)) {
                return res.status(400).json({ message: "Invalid phone number" });
            }
            const existingUser = yield User_1.User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const { firstName, lastName, password } = req.body;
            const encryptedPassword = yield helpers_1.encrypt.encryptpass(password);
            const user = new User_1.User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.phone = phone;
            user.password = encryptedPassword;
            user.role = "Recycler";
            yield User_1.User.save(user);
            return res.status(200).json({ message: "User created successfully" });
        });
    }
    /**
     * Makes a user an admin.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with a success message or error.
     */
    static makeAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield User_1.User.findOne({ where: { id } });
            if (user) {
                user.role = "Admin";
                yield User_1.User.save(user);
                return res.status(200).json({ message: `User ${user.firstName} ${user.lastName} is now an Admin` });
            }
            return res.status(404).json("User not found");
        });
    }
    /**
     * Gets all users.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with the list of users.
     */
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.find();
            const usersData = users.map(user => {
                const { password, createdAt, updatedAt } = user, data = __rest(user, ["password", "createdAt", "updatedAt"]);
                return data;
            });
            return res.status(200).json({ data: usersData });
        });
    }
    /**
     * Gets a user by ID.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with the user data or error.
     */
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield User_1.User.findOne({ where: { id } });
            return user ? res.status(200).json(user) : res.status(404).json("User not found");
        });
    }
    /**
     * Gets all recyclers.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with the list of recyclers.
     */
    static getRecyclers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.find({ where: { role: "Recycler" } });
            const usersData = users.map(user => {
                const { password, createdAt, updatedAt } = user, data = __rest(user, ["password", "createdAt", "updatedAt"]);
                return data;
            });
            return res.status(200).json({ data: usersData });
        });
    }
    /**
     * Gets all admins.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with the list of admins.
     */
    static getAdmins(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.find({ where: { role: "Admin" } });
            const usersData = users.map(user => {
                const { password, createdAt, updatedAt } = user, data = __rest(user, ["password", "createdAt", "updatedAt"]);
                return data;
            });
            return res.status(200).json({ data: usersData });
        });
    }
    /**
     * Gets the count of recyclers.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with the count of recyclers.
     */
    static getRecyclersCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCount = yield User_1.User.count({ where: { role: "Recycler" } });
            return res.status(200).json({ data: userCount });
        });
    }
    /**
     * Gets the count of admins.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with the count of admins.
     */
    static getAdminsCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminCount = yield User_1.User.count({ where: { role: "Admin" } });
            return res.status(200).json({ data: adminCount });
        });
    }
    /**
     * Updates the profile of the authenticated user.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with a success message or error.
     */
    static updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.authUser.id;
            const { firstName, lastName, phone } = req.body;
            const user = yield User_1.User.findOne({ where: { id } });
            if (user) {
                user.firstName = firstName;
                user.lastName = lastName;
                user.phone = phone;
                yield User_1.User.save(user);
                res.status(200).json({ message: "Profile updated successfully" });
            }
            else {
                res.status(404).json("User not found");
            }
        });
    }
    /**
     * Updates a user.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with a success message or error.
     */
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield User_1.User.findOne({ where: { id } });
            if (user) {
                const { email } = req.body;
                const existEmail = yield User_1.User.findOne({ where: { email } });
                if (existEmail && existEmail.id !== user.id) {
                    return res.status(400).json({ message: "Email already exists" });
                }
                const { firstName, lastName, phone } = req.body;
                user.firstName = firstName;
                user.lastName = lastName;
                user.phone = phone;
                user.email = email;
                yield User_1.User.save(user);
                res.status(200).json({ message: "User updated successfully" });
            }
            else {
                res.status(404).json("User not found");
            }
        });
    }
    /**
     * Deletes a user.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} - The response object with a success message or error.
     */
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield User_1.User.findOne({ where: { id } });
            if (user) {
                yield User_1.User.remove(user);
                res.status(200).json({ message: "User deleted successfully" });
            }
            else {
                res.status(404).json("User not found");
            }
        });
    }
}
exports.UserController = UserController;
