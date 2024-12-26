import { Request, Response } from 'express';
import { Submission } from '../schemas/Submission';

export class RecyclingController {
  static async getStats(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await Submission.createQueryBuilder('submission')
        .select('MONTH(submission.createdAt)', 'month')
        .addSelect('SUM(CHAR_LENGTH(submission.items) - CHAR_LENGTH(REPLACE(submission.items, ",", "")) + 1)', 'itemCount')
        .groupBy('MONTH(submission.createdAt)')
        .getRawMany();

      const data = Array(12).fill(0);
      stats.forEach(stat => {
        data[stat.month - 1] = parseInt(stat.itemCount, 10);
      });

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching recycling stats:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getTotalItemsByUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const submissions = await Submission.find({ where: { userId } });

      const totalItems = submissions.reduce((acc, submission) => acc + submission.items.length, 0);

      return res.status(200).json({ totalItems });
    } catch (error) {
      console.error('Error fetching total items by user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}