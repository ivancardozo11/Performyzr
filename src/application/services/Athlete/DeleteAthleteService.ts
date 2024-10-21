import { inject, injectable } from 'inversify';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository';

@injectable()
export class DeleteAthleteService {
  constructor(
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository
  ) {}

  async execute(id: string): Promise<void> {
    const athlete = await this.athleteRepository.findById(id);
    if (!athlete) {
      throw new Error('Athlete not found');
    }

    await this.athleteRepository.delete(id);
  }
}
