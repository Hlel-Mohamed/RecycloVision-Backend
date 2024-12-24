import express from 'express';
import {SubmissionController} from '../controllers/submission.controller';
import {RecyclingController} from "../controllers/recycling.controller";

const router = express.Router();

router.post('/submit', SubmissionController.submit);
router.get('/all', SubmissionController.getAll);
router.get('/summary', SubmissionController.getSummary);
router.get('/stats', RecyclingController.getStats);
router.get('/recent-activities', SubmissionController.getRecentActivities);

export default router;