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
exports.encrypt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
require("dotenv/config");
const { JWT_SECRET = "" } = process.env;
class encrypt {
    /**
     * Encrypts a password using bcrypt.
     *
     * @param {string} password - The password to encrypt.
     * @returns {Promise<string>} - The encrypted password.
     */
    static encryptpass(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.hashSync(password, 12);
        });
    }
    /**
     * Compares a password with a hashed password.
     *
     * @param {string} hashPassword - The hashed password.
     * @param {string} password - The plain text password.
     * @returns {boolean} - True if the passwords match, false otherwise.
     */
    static comparepassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    }
    /**
     * Generates a JWT token.
     *
     * @param {UserResponse} payload - The payload to include in the token.
     * @returns {string} - The generated JWT token.
     */
    static generateToken(payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    }
}
exports.encrypt = encrypt;
