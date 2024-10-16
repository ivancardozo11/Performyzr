import { inject, injectable } from 'inversify';
import { Context } from 'hono';
import { CreateAthleteService } from '../../../application/services/Athlete/CreateAthleteService';

@injectable()
export class AthleteController {
  constructor(
    @inject(CreateAthleteService) private createAthleteService: CreateAthleteService
  ) {}

  async createAthlete(c: Context) {
    try {
      const requestData = await c.req.json();
      const athlete = await this.createAthleteService.execute(requestData);
      return c.json({ message: 'Athlete created successfully', data: athlete });
    } catch (error) {
      return c.json({ error: 'Failed to create athlete' }, 400);
    }
  }
}
