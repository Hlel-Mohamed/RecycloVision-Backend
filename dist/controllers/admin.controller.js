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
exports.AdminController = void 0;
const Submission_1 = require("../schemas/Submission");
const User_1 = require("../schemas/User");
class AdminController {
    static approveSubmission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const submission = yield Submission_1.Submission.findOne({ where: { id } });
                if (!submission) {
                    return res.status(404).json({ message: 'Submission not found' });
                }
                const user = yield User_1.User.findOne({ where: { id: submission.userId } });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                user.walletPoints += submission.points;
                submission.status = 'Approved';
                yield User_1.User.save(user);
                yield Submission_1.Submission.save(submission);
                return res.status(200).json({ message: 'Submission approved successfully' });
            }
            catch (error) {
                console.error('Error approving submission:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    static rejectSubmission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const submission = yield Submission_1.Submission.findOne({ where: { id } });
                if (!submission) {
                    return res.status(404).json({ message: 'Submission not found' });
                }
                submission.status = 'Rejected';
                yield Submission_1.Submission.save(submission);
                return res.status(200).json({ message: 'Submission rejected' });
            }
            catch (error) {
                console.error('Error rejecting submission:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.AdminController = AdminController;
