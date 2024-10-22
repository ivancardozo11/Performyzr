import { inject, injectable } from 'inversify';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';
import { LeaderboardEntry } from '../../../domain/interfaces/LeaderboardEntry';

@injectable()
export class LeaderboardService {
  constructor(
    @inject('IPerformanceMetricRepository') private performanceMetricRepository: IPerformanceMetricRepository
  ) {}

  async execute(metricType: string | undefined, limit: number = 10): Promise<LeaderboardEntry[]> {
    if (!metricType) {
      throw new Error('Metric type is required');
    }

    return await this.performanceMetricRepository.getLeaderboardByMetricType(metricType, limit);
  }
}
