// athleteRoutes.ts
import { Hono } from 'hono';
import { AthleteController } from '../controllers/AthleteController';
import container from '../../../infrastructure/di/container';

const athleteRoutes = new Hono();

const athleteController = container.get<AthleteController>(AthleteController);

athleteRoutes.post('/', athleteController.createAthlete.bind(athleteController));

export { athleteRoutes };
