import { Request, Response } from 'express';
import { Submission } from '../schemas/Submission';
import s3 from '../config/aws-config';
import { v4 as uuidv4 } from 'uuid';

export class SubmissionController {
    static async submit(req: Request, res: Response): Promise<Response> {
        try {
            const { items, images, points, userId } = req.body;
            if (!items || !images || !points || !userId) {
                return res.status(400).json({ message: 'Invalid submission data' });
            }

            const imageUrls = await Promise.all(images.map(async (image: string) => {
                const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                const key = `${uuidv4()}.jpg`;

                const params = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
                    Key: key,
                    Body: buffer,
                    ContentEncoding: 'base64',
                    ContentType: 'image/jpeg',
                };

                const { Location } = await s3.upload(params).promise();
                return Location;
            }));

            const submission = new Submission();
            submission.items = items;
            submission.images = imageUrls;
            submission.points = points;
            submission.status = 'Pending';
            submission.userId = userId;

            await Submission.save(submission);

            return res.status(200).json({ message: 'Submission successful' });
        } catch (error) {
            console.error('Error submitting:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const submissions = await Submission.createQueryBuilder('submission')
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
        } catch (error) {
            console.error('Error fetching submissions:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}