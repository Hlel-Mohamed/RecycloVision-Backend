import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { auth } from '../middleware/auth.middleware';
import { authorization } from '../middleware/authorization';

const router = express.Router();

router.put('/approve/:id', auth, authorization(['Admin']), AdminController.approveSubmission);
router.put('/reject/:id', auth, authorization(['Admin']), AdminController.rejectSubmission);

export default router;