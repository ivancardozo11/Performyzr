import { inject, injectable } from 'inversify';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository';
import { Athlete } from '../../../domain/models/Athlete';

@injectable()
export class GetAthleteByIdService {
  constructor(
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository
  ) {}

  async execute(id: string): Promise<Athlete | null> {
    return await this.athleteRepository.findById(id);
  }
}