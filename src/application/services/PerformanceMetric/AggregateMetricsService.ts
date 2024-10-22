import { inject, injectable } from 'inversify';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository'; 
import { MetricAggregateResult } from '../../../domain/interfaces/MetricAggregateResult';
import { MetricType } from '../../../domain/value-objects/MetricType';
import redisClient from '../../../infrastructure/cache/RedisClient'; // Importamos RedisClient

@injectable()
export class AggregateMetricsService {
  constructor(
    @inject('IPerformanceMetricRepository') private performanceMetricRepository: IPerformanceMetricRepository,
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository
  ) {}

  async execute(athleteId: string, metricType?: string): Promise<MetricAggregateResult> {
    let validMetricType: string | undefined;

    const athleteExists = await this.athleteRepository.findById(athleteId);
    if (!athleteExists) {
      throw new Error('Athlete not found');
    }

    if (metricType) {
      const metricTypeObj = new MetricType(metricType);
      validMetricType = metricTypeObj.value();
    }

    const cacheKey = `athlete_metrics_aggregate_${athleteId}_${validMetricType || 'all'}`;

    const cachedAggregate = await redisClient.get(cacheKey);
    if (cachedAggregate) {
      return JSON.parse(cachedAggregate);
    }

    const aggregateMetrics = await this.performanceMetricRepository.aggregateByAthleteId(athleteId, validMetricType);

    await redisClient.set(cacheKey, JSON.stringify(aggregateMetrics), {
      EX: 3600,
    });

    return aggregateMetrics;
  }
}
