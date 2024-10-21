import { inject, injectable } from 'inversify';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';
import { PerformanceMetric } from '../../../domain/models/PerformanceMetric';

interface QueryParams {
  metricType?: string;
  dateRange?: { start: string; end: string };
}

@injectable()
export class GetMetricsService {
  constructor(
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository,
    @inject('IPerformanceMetricRepository') private performanceMetricRepository: IPerformanceMetricRepository
  ) {}

  async execute(athleteId: string, queryParams: QueryParams): Promise<PerformanceMetric[]> {
    const athlete = await this.athleteRepository.findById(athleteId);
    if (!athlete) {
      throw new Error('Athlete not found');
    }

    const metrics = await this.performanceMetricRepository.findByAthleteId(athleteId, queryParams);
    return metrics;
  }
}
