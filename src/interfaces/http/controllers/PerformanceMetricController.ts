import { inject, injectable } from 'inversify';
import { Context } from 'hono';
import { AddPerformanceMetricService } from '../../../application/services/PerformanceMetric/AddPerformanceMetricService';
import { GetMetricsService } from '../../../application/services/PerformanceMetric/GetMetricsService';


@injectable()
export class PerformanceMetricController {
  constructor(
    @inject(AddPerformanceMetricService) private addPerformanceMetricService: AddPerformanceMetricService,
    @inject(GetMetricsService) private getMetricsService: GetMetricsService
  ) {}

  async addPerformanceMetric(c: Context) {
    try {
    
      const athleteId = c.req.param('id').trim(); 
      const requestData = await c.req.json();
      const newMetric = await this.addPerformanceMetricService.execute(athleteId, requestData);

      return c.json({ message: 'Performance metric added', data: newMetric });
    } catch (error) {
      return c.json({ error: 'Failed to add performance metric' }, 400);
    }
  }
  async getMetrics(c: Context) {
    try {
      const athleteId = c.req.param('id').trim();
      const queryParams = c.req.query();
      const metrics = await this.getMetricsService.execute(athleteId, queryParams);

      return c.json({ data: metrics });
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Failed to retrieve metrics' }, 400);
    }
  }
}
