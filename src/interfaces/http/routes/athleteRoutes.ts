import { Hono } from 'hono';
import { AthleteController } from '../controllers/AthleteController';
import { PerformanceMetricController } from '../controllers/PerformanceMetricController';
import container from '../../../infrastructure/di/container';

const athleteRoutes = new Hono();

const athleteController = container.get<AthleteController>(AthleteController);
const performanceMetricController = container.get<PerformanceMetricController>(PerformanceMetricController);


athleteRoutes.post('/', athleteController.createAthlete.bind(athleteController));

athleteRoutes.post('/:id', performanceMetricController.addPerformanceMetric.bind(performanceMetricController));
  


export { athleteRoutes };
