import { Athlete } from '../models/Athlete';

export interface IAthleteRepository {
  create(data: Omit<Athlete, 'id'>): Promise<Athlete>;
}
