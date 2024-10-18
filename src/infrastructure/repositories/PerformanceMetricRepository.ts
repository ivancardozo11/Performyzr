import { injectable } from 'inversify';
import prisma from '../orm/PrismaClient';
import { IPerformanceMetricRepository } from '../../domain/repositories/IPerformanceMetricRepository';
import { PerformanceMetric } from '../../domain/models/PerformanceMetric';

@injectable()
export class PerformanceMetricRepository implements IPerformanceMetricRepository {
  async create(data: Omit<PerformanceMetric, 'id'>): Promise<PerformanceMetric> {
    return await prisma.performanceMetric.create({ data });
  }

}
