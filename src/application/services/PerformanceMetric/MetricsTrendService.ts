import { inject, injectable } from 'inversify';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';
import { calculateLinearRegression, predictFutureValue } from '../../../utils/LinearRegression';
import redisClient from '../../../infrastructure/cache/RedisClient';


interface TrendPoint {
  timestamp: Date;
  value: number;
}

@injectable()
export class MetricsTrendService {
  constructor(
    @inject('IPerformanceMetricRepository') private performanceMetricRepository: IPerformanceMetricRepository
  ) {}

  async execute(athleteId: string, metricType: string, dateRange?: { start: Date; end: Date }): Promise<{ trend: TrendPoint[]; prediction: number }> {
    const cacheKey = `athlete_metrics_trends_${athleteId}_${metricType}_${dateRange?.start?.toISOString() || 'no_start'}_${dateRange?.end?.toISOString() || 'no_end'}`;

    const cachedTrend = await redisClient.get(cacheKey);
    if (cachedTrend) {
      return JSON.parse(cachedTrend);
    }
    
    const metrics = await this.performanceMetricRepository.getMetricsTrend(athleteId, metricType, dateRange);

    if (metrics.length === 0) {
      throw new Error('No metrics found for the given athlete and metric type.');
    }

    const data = metrics.map((metric, index) => ({
      x: index,
      y: metric.value,
    }));

    const { slope, intercept } = calculateLinearRegression(data);

    const nextX = data.length;
    const prediction = predictFutureValue(slope, intercept, nextX);

    const trend = metrics.map((metric) => ({
      timestamp: metric.timestamp,
      value: metric.value,
    }));
    const result = { trend, prediction };

    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 3600 });

    return result;
  }
}
