import { Hono } from 'hono';
import { AthleteController } from '../controllers/AthleteController';
import { PerformanceMetricController } from '../controllers/PerformanceMetricController';
import container from '../../../infrastructure/di/container';
import { authMiddleware } from '../../../middleware/authMiddleware';

const athleteRoutes = new Hono();

const athleteController = container.get<AthleteController>(AthleteController);
const performanceMetricController = container.get<PerformanceMetricController>(PerformanceMetricController);


athleteRoutes.get('/', athleteController.getAllAthletes.bind(athleteController));
athleteRoutes.get('/:id', athleteController.getAthleteById.bind(athleteController));


athleteRoutes.post('/', authMiddleware, athleteController.createAthlete.bind(athleteController));
athleteRoutes.put('/:id', authMiddleware, athleteController.updateAthlete.bind(athleteController));
athleteRoutes.delete('/:id', authMiddleware, athleteController.deleteAthlete.bind(athleteController));


athleteRoutes.post('/:id/metrics', authMiddleware, performanceMetricController.addPerformanceMetric.bind(performanceMetricController));
athleteRoutes.get('/:id/metrics', performanceMetricController.getMetrics.bind(performanceMetricController));
athleteRoutes.get('/:id/metrics/aggregate', performanceMetricController.aggregateMetrics.bind(performanceMetricController));


athleteRoutes.get('/metrics/leaderboard', performanceMetricController.getLeaderboard.bind(performanceMetricController));

athleteRoutes.get('/:id/metrics/trends', performanceMetricController.getMetricsTrend.bind(performanceMetricController));

export { athleteRoutes };
