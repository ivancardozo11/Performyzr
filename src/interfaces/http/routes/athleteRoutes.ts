import { Hono } from 'hono';
import { CreateAthleteService } from '../../../application/services/Athlete/CreateAthleteService';
import container from '../../../infrastructure/di/container';

export const athleteRoutes = new Hono();

athleteRoutes.post('/', async (c) => {
  const requestData = await c.req.json();

  const createAthleteService = container.get<CreateAthleteService>('CreateAthleteService');
  
  const newAthlete = await createAthleteService.execute(requestData);

  return c.json({ message: 'Atleta creado', data: newAthlete });
});
