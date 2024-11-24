import { Request, Response } from 'express';
import { Submission } from '../schemas/Submission';

export class AdminController {
    static async approveSubmission(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const submission = await Submission.findOne({ where: { id } });

            if (!submission) {
                return res.status(404).json({ message: 'Submission not found' });
            }

            submission.status = 'Approved';
            await Submission.save(submission);

            return res.status(200).json({ message: 'Submission approved' });
        } catch (error) {
            console.error('Error approving submission:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async rejectSubmission(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const submission = await Submission.findOne({ where: { id } });

            if (!submission) {
                return res.status(404).json({ message: 'Submission not found' });
            }

            submission.status = 'Rejected';
            await Submission.save(submission);

            return res.status(200).json({ message: 'Submission rejected' });
        } catch (error) {
            console.error('Error rejecting submission:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}