// tests/unit/application/services/PerformanceMetric/LeaderboardService.test.ts

import 'reflect-metadata';
import { LeaderboardService } from '../../../../../src/application/services/PerformanceMetric/LeaderboardService';
import { IPerformanceMetricRepository } from '../../../../../src/domain/repositories/IPerformanceMetricRepository';
import { LeaderboardEntry } from '../../../../../src/domain/interfaces/LeaderboardEntry';
import { mock } from 'jest-mock-extended';
import redisClient from '../../../../../src/infrastructure/cache/RedisClient';

jest.mock('../../../../../src/infrastructure/cache/RedisClient');

describe('LeaderboardService', () => {
  let leaderboardService: LeaderboardService;
  let performanceMetricRepositoryMock: jest.Mocked<IPerformanceMetricRepository>;

  beforeEach(() => {
    performanceMetricRepositoryMock = mock<IPerformanceMetricRepository>();
    leaderboardService = new LeaderboardService(performanceMetricRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should get the leaderboard correctly', async () => {
    const metricType = 'speed';
    const limit = 5;

    const leaderboardData: LeaderboardEntry[] = [
      {
        athleteId: 'athlete-1',
        athleteName: 'John Doe',
        averageValue: 10,
      },
      {
        athleteId: 'athlete-2',
        athleteName: 'Jane Smith',
        averageValue: 9,
      },
    ];

    (redisClient.get as jest.Mock).mockResolvedValue(null);
    performanceMetricRepositoryMock.getLeaderboardByMetricType.mockResolvedValue(leaderboardData);
    (redisClient.set as jest.Mock).mockResolvedValue('OK');

    const result = await leaderboardService.execute(metricType, limit);

    expect(performanceMetricRepositoryMock.getLeaderboardByMetricType).toHaveBeenCalledWith(
      metricType,
      limit
    );
    expect(redisClient.set).toHaveBeenCalled();
    expect(result).toEqual(leaderboardData);
  });

  it('Should get leaderboard from cache if available', async () => {
    const metricType = 'speed';
    const limit = 5;

    const cachedData: LeaderboardEntry[] = [
      {
        athleteId: 'athlete-1',
        athleteName: 'John Doe',
        averageValue: 10,
      },
    ];

    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(cachedData));

    const result = await leaderboardService.execute(metricType, limit);

    expect(performanceMetricRepositoryMock.getLeaderboardByMetricType).not.toHaveBeenCalled();
    expect(result).toEqual(cachedData);
  });
});
