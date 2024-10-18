import { PerformanceMetric } from '../models/PerformanceMetric';

export interface IPerformanceMetricRepository {
  create(data: Omit<PerformanceMetric, 'id'>): Promise<PerformanceMetric>;
}
