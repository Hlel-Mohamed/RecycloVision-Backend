import { Request, Response } from 'express';
import { Submission } from '../schemas/Submission';
import { User } from '../schemas/User';

export class AdminController {
    static async approveSubmission(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const submission = await Submission.findOne({ where: { id } });

            if (!submission) {
                return res.status(404).json({ message: 'Submission not found' });
            }

            const user = await User.findOne({ where: { id: submission.userId } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.walletPoints += submission.points;
            submission.status = 'Approved';

            await User.save(user);
            await Submission.save(submission);

            return res.status(200).json({ message: 'Submission approved successfully' });
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