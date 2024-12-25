"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authorization_1 = require("../middleware/authorization");
const router = express_1.default.Router();
router.put('/approve/:id', auth_middleware_1.auth, (0, authorization_1.authorization)(['Admin']), admin_controller_1.AdminController.approveSubmission);
router.put('/reject/:id', auth_middleware_1.auth, (0, authorization_1.authorization)(['Admin']), admin_controller_1.AdminController.rejectSubmission);
exports.default = router;
