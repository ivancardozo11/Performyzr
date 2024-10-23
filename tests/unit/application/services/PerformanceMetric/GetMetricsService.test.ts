import 'reflect-metadata';
import { GetMetricsService } from '../../../../../src/application/services/PerformanceMetric/GetMetricsService';
import { IAthleteRepository } from '../../../../../src/domain/repositories/IAthleteRepository';
import { IPerformanceMetricRepository } from '../../../../../src/domain/repositories/IPerformanceMetricRepository';
import { Athlete } from '../../../../../src/domain/models/Athlete';
import { PerformanceMetric } from '../../../../../src/domain/models/PerformanceMetric';
import { QueryParams } from '../../../../../src/domain/interfaces/QueryParams';
import { mock } from 'jest-mock-extended';
import redisClient from '../../../../../src/infrastructure/cache/RedisClient';

jest.mock('../../../../../src/infrastructure/cache/RedisClient');

describe('GetMetricsService', () => {
  let getMetricsService: GetMetricsService;
  let athleteRepositoryMock: jest.Mocked<IAthleteRepository>;
  let performanceMetricRepositoryMock: jest.Mocked<IPerformanceMetricRepository>;

  beforeEach(() => {
    athleteRepositoryMock = mock<IAthleteRepository>();
    performanceMetricRepositoryMock = mock<IPerformanceMetricRepository>();
    getMetricsService = new GetMetricsService(
      athleteRepositoryMock,
      performanceMetricRepositoryMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should retrieve metrics for a given athlete', async () => {
    const athleteId = 'athlete-123';
    const queryParams: QueryParams = {};

    const athlete: Athlete = {
      id: athleteId,
      name: 'John Doe',
      age: 25,
      team: 'Team A',
      createdAt: new Date(),
    };

    const metrics: PerformanceMetric[] = [
      {
        id: 'metric-1',
        athleteId,
        metricType: 'speed',
        value: 10,
        unit: 'm/s',
        timestamp: new Date(),
      },
    ];

    athleteRepositoryMock.findById.mockResolvedValue(athlete);
    performanceMetricRepositoryMock.findByAthleteId.mockResolvedValue(metrics);
    (redisClient.get as jest.Mock).mockResolvedValue(null);
    (redisClient.set as jest.Mock).mockResolvedValue('OK');

    const result = await getMetricsService.execute(athleteId, queryParams);

    expect(athleteRepositoryMock.findById).toHaveBeenCalledWith(athleteId);
    expect(performanceMetricRepositoryMock.findByAthleteId).toHaveBeenCalledWith(
      athleteId,
      queryParams
    );
    expect(redisClient.set).toHaveBeenCalled();
    expect(result).toEqual(metrics);
  });

  it('Should throw an error if the athlete does not exist', async () => {
    const athleteId = 'athlete-123';
    const queryParams: QueryParams = {};

    athleteRepositoryMock.findById.mockResolvedValue(null);

    await expect(getMetricsService.execute(athleteId, queryParams)).rejects.toThrow(
      'Athlete not found'
    );
    expect(athleteRepositoryMock.findById).toHaveBeenCalledWith(athleteId);
    expect(performanceMetricRepositoryMock.findByAthleteId).not.toHaveBeenCalled();
  });
});
