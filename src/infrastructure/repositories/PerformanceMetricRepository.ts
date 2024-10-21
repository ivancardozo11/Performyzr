import { injectable } from 'inversify';
import prisma from '../orm/PrismaClient';
import { IPerformanceMetricRepository } from '../../domain/repositories/IPerformanceMetricRepository';
import { PerformanceMetric } from '../../domain/models/PerformanceMetric';

interface QueryParams {
  metricType?: string;
  dateRange?: { start: string; end: string };
}

@injectable()
export class PerformanceMetricRepository implements IPerformanceMetricRepository {
  async create(data: Omit<PerformanceMetric, 'id'>): Promise<PerformanceMetric> {
    return await prisma.performanceMetric.create({ data });
  }

  async findByAthleteId(athleteId: string, queryParams: QueryParams): Promise<PerformanceMetric[]> {
    const { metricType, dateRange } = queryParams;
    
    const whereClause: Record<string, unknown> = { athleteId };

    if (metricType) {
      whereClause.metricType = metricType;
    }

    if (dateRange?.start && dateRange?.end) {
      whereClause.timestamp = {
        gte: new Date(dateRange.start),
        lte: new Date(dateRange.end),
      };
    }

    return await prisma.performanceMetric.findMany({
      where: whereClause,
    });
  }
}