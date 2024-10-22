import { inject, injectable } from 'inversify';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';
import { LeaderboardEntry } from '../../../domain/interfaces/LeaderboardEntry';
import redisClient from '../../../infrastructure/cache/RedisClient'

@injectable()
export class LeaderboardService {
  constructor(
    @inject('IPerformanceMetricRepository') private performanceMetricRepository: IPerformanceMetricRepository
  ) {}

  async execute(metricType: string, limit: number = 10): Promise<LeaderboardEntry[]> {
    const cacheKey = `athlete_metrics_leaderboard_${metricType}_limit_${limit}`;
    console.log(cacheKey, "esta es la cache generada por Leaderboard");

    const cachedLeaderboard = await redisClient.get(cacheKey);
    if (cachedLeaderboard) {
      return JSON.parse(cachedLeaderboard);
    }

    const leaderboard = await this.performanceMetricRepository.getLeaderboardByMetricType(metricType, limit);

    await redisClient.set(cacheKey, JSON.stringify(leaderboard), { EX: 3600 });

    return leaderboard;
  }
}
