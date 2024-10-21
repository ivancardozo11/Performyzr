import { inject, injectable } from 'inversify';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository';
import { Athlete } from '../../../domain/models/Athlete';

@injectable()
export class UpdateAthleteService {
  constructor(
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository
  ) {}

  async execute(id: string, data: Partial<Athlete>): Promise<Athlete> {
    const athlete = await this.athleteRepository.findById(id);
    if (!athlete) {
      throw new Error('Athlete not found');
    }
    
    const updatedAthlete = await this.athleteRepository.update(id, data);
    return updatedAthlete;
  }
}
