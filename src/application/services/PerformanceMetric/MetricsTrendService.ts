import { inject, injectable } from 'inversify';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';
import { PerformanceMetric } from '../../../domain/models/PerformanceMetric';
import { calculateLinearRegression, predictFutureValue } from '../../../utils/LinearRegression';

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

    return { trend, prediction };
  }
}
