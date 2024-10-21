import { Hono } from 'hono';
import { AthleteController } from '../controllers/AthleteController';
import { PerformanceMetricController } from '../controllers/PerformanceMetricController';
import container from '../../../infrastructure/di/container';

const athleteRoutes = new Hono();

const athleteController = container.get<AthleteController>(AthleteController);
const performanceMetricController = container.get<PerformanceMetricController>(PerformanceMetricController);


athleteRoutes.post('/', athleteController.createAthlete.bind(athleteController));
athleteRoutes.get('/', athleteController.getAllAthletes.bind(athleteController));
athleteRoutes.get('/:id', athleteController.getAthleteById.bind(athleteController));
athleteRoutes.post('/:id/metrics', performanceMetricController.addPerformanceMetric.bind(performanceMetricController));  


export { athleteRoutes };
