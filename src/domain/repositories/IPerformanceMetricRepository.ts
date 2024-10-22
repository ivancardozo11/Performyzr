import { PerformanceMetric } from '../models/PerformanceMetric';
import { MetricAggregateResult } from '../interfaces/MetricAggregateResult';

export interface IPerformanceMetricRepository {
  create(data: Omit<PerformanceMetric, 'id'>): Promise<PerformanceMetric>;
  findByAthleteId(athleteId: string, queryParams: { metricType?: string, dateRange?: { start: string, end: string } }): Promise<PerformanceMetric[]>;
  aggregateByAthleteId(athleteId: string, metricType?: string): Promise<MetricAggregateResult>;

}
