import { Hono } from 'hono';
import { PerformanceMetricController } from '../controllers/PerformanceMetricController';
import container from '../../../infrastructure/di/container';

export const metricRoutes = new Hono();

const performanceMetricController = container.get<PerformanceMetricController>(PerformanceMetricController);

metricRoutes.post('/:id', performanceMetricController.addPerformanceMetric.bind(performanceMetricController));
