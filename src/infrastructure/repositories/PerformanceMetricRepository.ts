import { injectable } from 'inversify';
import prisma from '../orm/PrismaClient';
import { IPerformanceMetricRepository } from '../../domain/repositories/IPerformanceMetricRepository';
import { PerformanceMetric } from '../../domain/models/PerformanceMetric';
import { MetricAggregateResult } from '../../domain/interfaces/MetricAggregateResult';
import { MetricAggregator } from '../../domain/value-objects/MetricAggregator';
import { LeaderboardEntry } from '../../domain/interfaces/LeaderboardEntry';
import { QueryParams } from '../../domain/interfaces/QueryParams';


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

  async aggregateByAthleteId(athleteId: string, metricType?: string): Promise<MetricAggregateResult> {
  

  const whereClause: { athleteId: string; metricType?: string } = { athleteId };
  
    if (metricType) {
      whereClause.metricType = metricType;
    }
  
    const aggregateResult = await prisma.performanceMetric.aggregate({
      where: whereClause,
      _avg: { value: true },
      _max: { value: true },
      _min: { value: true },
      _count: { value: true },
    });
  
    const average = aggregateResult._avg.value || 0;
    const max = aggregateResult._max.value || 0;
    const min = aggregateResult._min.value || 0;
    const count = aggregateResult._count.value || 0;
  
    let standardDeviation: number | undefined;
  
    if (count > 1) {
      const metrics: Array<{ value: number }> = await prisma.performanceMetric.findMany({
        where: whereClause,
        select: { value: true },
      });
  
      
      const values = metrics.map((m) => m.value);
      standardDeviation = MetricAggregator.calculateStandardDeviation(values, average);
    }
  
    return { average, max, min, count, standardDeviation };
  }
  
  async getLeaderboardByMetricType(metricType: string, limit: number): Promise<LeaderboardEntry[]> {
    const leaderboard = await prisma.performanceMetric.groupBy({
      by: ['athleteId'],
      where: {
        metricType,
      },
      _avg: {
        value: true,
      },
      orderBy: {
        _avg: {
          value: 'desc',
        },
      },
      take: limit,
    });

    const leaderboardWithAthleteNames: LeaderboardEntry[] = await Promise.all(
      leaderboard.map(async (entry) => {
        const athlete = await prisma.athlete.findUnique({ where: { id: entry.athleteId } });
        return {
          athleteId: entry.athleteId,
          athleteName: athlete ? athlete.name : 'Unknown',
          averageValue: entry._avg.value ?? 0,
        };
      })
    );

    return leaderboardWithAthleteNames;
  }
  async getMetricsTrend(athleteId: string, metricType: string, dateRange?: { start: Date; end: Date }): Promise<PerformanceMetric[]> {
    const whereClause: Record<string, unknown> = { athleteId, metricType };

    if (dateRange?.start && dateRange?.end) {
      whereClause.timestamp = {
        gte: dateRange.start,
        lte: dateRange.end,
      };
    }

    return await prisma.performanceMetric.findMany({
      where: whereClause,
      orderBy: {
        timestamp: 'asc',
      },
    });
  }
  
}