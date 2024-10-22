import { inject, injectable } from 'inversify';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';
import { PerformanceMetric } from '../../../domain/models/PerformanceMetric';
import { QueryParams } from '../../../domain/interfaces/QueryParams';
import redisClient from '../../../infrastructure/cache/RedisClient';


@injectable()
export class GetMetricsService {
  constructor(
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository,
    @inject('IPerformanceMetricRepository') private performanceMetricRepository: IPerformanceMetricRepository
  ) {}

  async execute(athleteId: string, queryParams: QueryParams): Promise<PerformanceMetric[]> {

    const cacheKey = `athlete_metrics_${athleteId}_${JSON.stringify(queryParams)}`;

    const cachedMetrics = await redisClient.get(cacheKey);
    if (cachedMetrics) {
      return JSON.parse(cachedMetrics);
    }

    const athlete = await this.athleteRepository.findById(athleteId);
    if (!athlete) {
      throw new Error('Athlete not found');
    }

    const metrics = await this.performanceMetricRepository.findByAthleteId(athleteId, queryParams);

    await redisClient.set(cacheKey, JSON.stringify(metrics), {
      EX: 3600,
    });
    return metrics;
  }
}
