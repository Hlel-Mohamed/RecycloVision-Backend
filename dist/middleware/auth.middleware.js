"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv/config");
/**
 * Middleware to authenticate a user based on a JWT token.
 *
 * @param {any} req - The request object, which should contain the token in the headers.
 * @param {Response} res - The response object used to send back the appropriate HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Response|void} - Returns a 401 response if authentication fails, otherwise calls the next middleware.
 */
const auth = (req, res, next) => {
    const token = req.headers["token"];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET || "");
        req["authUser"] = decode;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.auth = auth;