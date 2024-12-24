import { Request, Response } from 'express';
import { Submission } from '../schemas/Submission';

export class RecyclingController {
  static async getStats(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await Submission.createQueryBuilder('submission')
        .select('MONTH(submission.createdAt)', 'month')
        .addSelect('COUNT(submission.id)', 'count')
        .groupBy('MONTH(submission.createdAt)')
        .getRawMany();

      const data = Array(12).fill(0);
      stats.forEach(stat => {
        data[stat.month - 1] = stat.count;
      });

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching recycling stats:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}