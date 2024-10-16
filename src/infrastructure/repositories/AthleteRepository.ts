import { injectable } from 'inversify';
import { IAthleteRepository } from '../../domain/repositories/IAthleteRepository';
import prisma from '../orm/PrismaClient';
import { Athlete } from '../../domain/models/Athlete';

@injectable()
export class AthleteRepository implements IAthleteRepository {
  async create(data: Omit<Athlete, 'id'>): Promise<Athlete> {
    return await prisma.athlete.create({ data });
  }
  async findById(id: string): Promise<Athlete | null> {
    return await prisma.athlete.findUnique({
      where: { id },
    });
  }
}
