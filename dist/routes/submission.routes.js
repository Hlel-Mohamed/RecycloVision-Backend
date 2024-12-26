"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const submission_controller_1 = require("../controllers/submission.controller");
const router = express_1.default.Router();
router.post('/submit', submission_controller_1.SubmissionController.submit);
router.get('/submissions', submission_controller_1.SubmissionController.getAll);
exports.default = router;
