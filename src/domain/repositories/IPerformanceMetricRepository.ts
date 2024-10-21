import { PerformanceMetric } from '../models/PerformanceMetric';

export interface IPerformanceMetricRepository {
  create(data: Omit<PerformanceMetric, 'id'>): Promise<PerformanceMetric>;
  findByAthleteId(athleteId: string, queryParams: { metricType?: string, dateRange?: { start: string, end: string } }): Promise<PerformanceMetric[]>;

}
