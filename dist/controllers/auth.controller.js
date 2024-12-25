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
exports.AuthController = void 0;
const User_1 = require("../schemas/User");
const helpers_1 = require("../helpers/helpers");
class AuthController {
    /**
     * Handles user login.
     *
     * @param {Request} req - The request object containing email and password in the body.
     * @param {Response} res - The response object used to send back the appropriate HTTP response.
     * @returns {Promise<Response>} - A promise that resolves to the HTTP response.
     */
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(500).json({ message: "email and password required" });
                }
                const user = yield User_1.User.findOne({ where: { email } });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                else {
                    const isPasswordValid = helpers_1.encrypt.comparepassword(user.password, password);
                    if (!user || !isPasswordValid) {
                        return res.status(404).json({ message: "User not found" });
                    }
                    const token = helpers_1.encrypt.generateToken({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        email: user.email,
                        role: user.role,
                    });
                    const { password: _, createdAt, updatedAt } = user, result = __rest(user, ["password", "createdAt", "updatedAt"]);
                    return res
                        .status(200)
                        .json({ message: "Login successful", token, result });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.AuthController = AuthController;
