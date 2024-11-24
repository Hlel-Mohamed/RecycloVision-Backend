import { Request, Response } from 'express';
import { Submission } from '../schemas/Submission';

export class SubmissionController {
    static async submit(req: Request, res: Response): Promise<Response> {
        try {
            const { items, images, points } = req.body;
            if (!items || !images || !points) {
                return res.status(400).json({ message: 'Invalid submission data' });
            }

            const submission = new Submission();
            submission.items = items;
            submission.images = images;
            submission.points = points;
            submission.status = 'Pending';

            await Submission.save(submission);

            return res.status(200).json({ message: 'Submission successful' });
        } catch (error) {
            console.error('Error submitting:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const submissions = await Submission.find();
            return res.status(200).json(submissions);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}