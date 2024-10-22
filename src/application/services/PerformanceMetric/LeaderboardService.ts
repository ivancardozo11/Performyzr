import { inject, injectable } from 'inversify';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';

@injectable()
export class LeaderboardService {
  constructor(
    @inject('IPerformanceMetricRepository') private performanceMetricRepository: IPerformanceMetricRepository
  ) {}

  async execute(metricType: string, limit: number = 10) {
    if (!metricType) {
      throw new Error('Metric type is required');
    }

    return await this.performanceMetricRepository.getLeaderboardByMetricType(metricType, limit);
  }
}
