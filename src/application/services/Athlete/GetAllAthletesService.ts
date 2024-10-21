import { inject, injectable } from 'inversify';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository';
import { Athlete } from '../../../domain/models/Athlete';

@injectable()
export class GetAllAthletesService {
  constructor(
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository
  ) {}

  async execute(): Promise<Athlete[]> {
    return await this.athleteRepository.findAll();
  }
}
