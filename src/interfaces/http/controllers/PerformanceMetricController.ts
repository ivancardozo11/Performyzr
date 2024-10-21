import { inject, injectable } from 'inversify';
import { Context } from 'hono';
import { AddPerformanceMetricService } from '../../../application/services/PerformanceMetric/AddPerformanceMetricService';

@injectable()
export class PerformanceMetricController {
  constructor(
    @inject(AddPerformanceMetricService) private addPerformanceMetricService: AddPerformanceMetricService
  ) {}

  async addPerformanceMetric(c: Context) {
    try {
      const athleteId = c.req.param('id').trim();
      const requestData = await c.req.json();

      const newMetric = await this.addPerformanceMetricService.execute({
        athleteId,
        ...requestData,
      });

      return c.json({ message: 'Performance metric added', data: newMetric });
    } catch (error) {
      console.log(error)
      return c.json({ error: 'Failed to add performance' }, 400);
    }
  }
}
