import { Hono } from 'hono';
import { AthleteController } from '../controllers/AthleteController';
import { PerformanceMetricController } from '../controllers/PerformanceMetricController';
import container from '../../../infrastructure/di/container';

const athleteRoutes = new Hono();

const athleteController = container.get<AthleteController>(AthleteController);
const performanceMetricController = container.get<PerformanceMetricController>(PerformanceMetricController);


athleteRoutes.get('/', athleteController.getAllAthletes.bind(athleteController));
athleteRoutes.get('/:id', athleteController.getAthleteById.bind(athleteController));
athleteRoutes.post('/', athleteController.createAthlete.bind(athleteController));
athleteRoutes.post('/:id/metrics', performanceMetricController.addPerformanceMetric.bind(performanceMetricController));
athleteRoutes.get('/:id/metrics', performanceMetricController.getMetrics.bind(performanceMetricController));
athleteRoutes.put('/:id', athleteController.updateAthlete.bind(athleteController));
athleteRoutes.delete('/:id', athleteController.deleteAthlete.bind(athleteController));
athleteRoutes.get('/:id/metrics/aggregate', performanceMetricController.aggregateMetrics.bind(performanceMetricController));


export { athleteRoutes };
