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
      include: { performanceMetrics: true },
    });
  }

  async findAll(): Promise<Athlete[]> {
    return await prisma.athlete.findMany({
      include: { performanceMetrics: true },
    });
  }
  async update(id: string, data: Partial<Athlete>): Promise<Athlete> {
    return await prisma.athlete.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.performanceMetric.deleteMany({
      where: { athleteId: id },
    });

    await prisma.athlete.delete({
      where: { id },
    });
  }
}
