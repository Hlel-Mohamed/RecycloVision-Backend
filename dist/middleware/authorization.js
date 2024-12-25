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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const User_1 = require("../schemas/User");
/**
 * Middleware to authorize a user based on their role.
 *
 * @param {string[]} roles - The roles that are allowed to access the route.
 * @returns {Function} - The middleware function to authorize the user.
 */
const authorization = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOneBy({
            id: req["authUser"].id,
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (!roles.includes(user.role))
            return res.status(403).json({ message: "Forbidden" });
        next();
    });
};
exports.authorization = authorization;
