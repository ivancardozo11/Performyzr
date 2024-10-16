import { inject, injectable } from 'inversify';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository';
import { Athlete } from '../../../domain/models/Athlete';

@injectable()
export class CreateAthleteService {
  constructor(
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository
  ) {}

  async execute(data: Omit<Athlete, 'id'>): Promise<Athlete> {
    const newAthlete = await this.athleteRepository.create(data);
    return newAthlete;
  }
}
