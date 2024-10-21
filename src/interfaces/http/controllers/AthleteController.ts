import { inject, injectable } from 'inversify';
import { Context } from 'hono';
import { CreateAthleteService } from '../../../application/services/Athlete/CreateAthleteService';
import { GetAllAthletesService } from '../../../application/services/Athlete/GetAllAthletesService';
import { GetAthleteByIdService } from '../../../application/services/Athlete/GetAthleteByIdService';


@injectable()
export class AthleteController {
  constructor(
    @inject(CreateAthleteService) private createAthleteService: CreateAthleteService,
    @inject(GetAllAthletesService) private getAllAthletesService: GetAllAthletesService,
    @inject(GetAthleteByIdService) private getAthleteByIdService: GetAthleteByIdService

    
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

  async getAllAthletes(c: Context) {
  try {
    const athletes = await this.getAllAthletesService.execute();

    if (!athletes || athletes.length === 0) {
      return c.json({ message: 'No athletes found' }, 404);
    }

    return c.json(athletes, 200);
  } catch (error) {
    console.error('Error fetching athletes:', error);
    return c.json({ error: 'Failed to retrieve athletes' }, 500);
  }
}
async getAthleteById(c: Context) {
  try {
    const athleteId = c.req.param('id');

    if (!athleteId) {
      return c.json({ error: 'Athlete ID is required' }, 400);
    }

    const athlete = await this.getAthleteByIdService.execute(athleteId);

    if (!athlete) {
      return c.json({ message: 'Athlete not found' }, 404);
    }

    return c.json(athlete, 200);
  } catch (error) {
    console.error('Error fetching athlete by ID:', error);
    return c.json({ error: 'Failed to retrieve athlete' }, 500);
  }
}

}
