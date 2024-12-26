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
exports.SubmissionController = void 0;
const Submission_1 = require("../schemas/Submission");
class SubmissionController {
    static submit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { items, images, points, userId } = req.body;
                if (!items || !images || !points || !userId) {
                    return res.status(400).json({ message: 'Invalid submission data' });
                }
                const submission = new Submission_1.Submission();
                submission.items = items;
                submission.images = images;
                submission.points = points;
                submission.status = 'Pending';
                submission.userId = userId;
                yield Submission_1.Submission.save(submission);
                return res.status(200).json({ message: 'Submission successful' });
            }
            catch (error) {
                console.error('Error submitting:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const submissions = yield Submission_1.Submission.createQueryBuilder('submission')
                    .leftJoinAndSelect('submission.user', 'user')
                    .select([
                    'submission.id',
                    'submission.items',
                    'submission.images',
                    'submission.points',
                    'submission.status',
                    'user.firstName',
                    'user.lastName'
                ])
                    .getMany();
                return res.status(200).json(submissions);
            }
            catch (error) {
                console.error('Error fetching submissions:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.SubmissionController = SubmissionController;
