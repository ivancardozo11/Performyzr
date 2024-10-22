import { inject, injectable } from 'inversify';
import { Context } from 'hono';
import { AddPerformanceMetricService } from '../../../application/services/PerformanceMetric/AddPerformanceMetricService';
import { GetMetricsService } from '../../../application/services/PerformanceMetric/GetMetricsService';
import { AggregateMetricsService } from '../../../application/services/PerformanceMetric/AggregateMetricsService';
import { handleControllerError } from '../../../utils/errorHandler';

@injectable()
export class PerformanceMetricController {
  constructor(
    @inject(AddPerformanceMetricService) private addPerformanceMetricService: AddPerformanceMetricService,
    @inject(GetMetricsService) private getMetricsService: GetMetricsService,
    @inject(AggregateMetricsService) private aggregateMetricsService: AggregateMetricsService
  ) {}

  async addPerformanceMetric(c: Context) {
    try {
      const athleteId = c.req.param('id').trim(); 
      const requestData = await c.req.json();
      const newMetric = await this.addPerformanceMetricService.execute(athleteId, requestData);

      return c.json({ message: 'Performance metric added', data: newMetric });
    } catch (error: unknown) {
      const { error: errorMessage, statusCode } = handleControllerError(error, 'Failed to add performance metric');
      return c.json({ error: errorMessage }, statusCode);
    }
  }

  async getMetrics(c: Context) {
    try {
      const athleteId = c.req.param('id').trim();
      const queryParams = c.req.query();
      const metrics = await this.getMetricsService.execute(athleteId, queryParams);

      return c.json({ data: metrics });
    } catch (error: unknown) {
      const { error: errorMessage, statusCode } = handleControllerError(error, 'Failed to retrieve metrics');
      return c.json({ error: errorMessage }, statusCode);
    }
  }

  async aggregateMetrics(c: Context) {
    try {
      const athleteId = c.req.param('id').trim();
      const metricType = c.req.query('metricType');
      const aggregateData = await this.aggregateMetricsService.execute(athleteId, metricType);
      return c.json({ data: aggregateData });
    } catch (error: unknown) {
      const { error: errorMessage, statusCode } = handleControllerError(error, 'Error retrieving aggregate metrics');
      return c.json({ error: errorMessage }, statusCode);
    }
  }
}
