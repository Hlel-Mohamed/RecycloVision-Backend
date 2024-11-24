import express from 'express';
import { SubmissionController } from '../controllers/submission.controller';

const router = express.Router();

router.post('/submit', SubmissionController.submit);
router.get('/submissions', SubmissionController.getAll);

export default router;