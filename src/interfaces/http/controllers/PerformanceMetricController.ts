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
      // Obtener el athleteId desde los parámetros de la URL
      const athleteId = c.req.param('id').trim();
      
      // Obtener los datos de la métrica del cuerpo de la solicitud
      const requestData = await c.req.json();

      // Ejecutar el servicio con el athleteId y los datos de la métrica
      const newMetric = await this.addPerformanceMetricService.execute(athleteId, requestData);

      // Devolver la respuesta con la métrica creada
      return c.json({ message: 'Performance metric added', data: newMetric });
    } catch (error) {
      // En caso de error, devolver un mensaje de fallo
      console.log(error);
      return c.json({ error: 'Failed to add performance metric' }, 400);
    }
  }
}
