import 'reflect-metadata';
import { AddPerformanceMetricService } from '../../../../../src/application/services/PerformanceMetric/AddPerformanceMetricService';
import { IAthleteRepository } from '../../../../../src/domain/repositories/IAthleteRepository';
import { IPerformanceMetricRepository } from '../../../../../src/domain/repositories/IPerformanceMetricRepository';
import { Athlete } from '../../../../../src/domain/models/Athlete';
import { PerformanceMetric } from '../../../../../src/domain/models/PerformanceMetric';
import { mock } from 'jest-mock-extended';
import * as cacheUtils from '../../../../../src/utils/cacheUtils';

jest.mock('../../../../../src/utils/cacheUtils');

describe('AddPerformanceMetricService', () => {
  let addPerformanceMetricService: AddPerformanceMetricService;
  let athleteRepositoryMock: jest.Mocked<IAthleteRepository>;
  let performanceMetricRepositoryMock: jest.Mocked<IPerformanceMetricRepository>;

  beforeEach(() => {
    athleteRepositoryMock = mock<IAthleteRepository>();
    performanceMetricRepositoryMock = mock<IPerformanceMetricRepository>();
    addPerformanceMetricService = new AddPerformanceMetricService(
      athleteRepositoryMock,
      performanceMetricRepositoryMock
    );
  });

  it('debe agregar una métrica de rendimiento correctamente', async () => {
    const athleteId = 'athlete-123';
    const athlete: Athlete = {
      id: athleteId,
      name: 'John Doe',
      age: 25,
      team: 'Team A',
      createdAt: new Date(),
    };

    const metricData = {
      metricType: 'speed',
      value: 10,
      unit: 'm/s',
      timestamp: new Date(),
    };

    const newMetric: PerformanceMetric = {
      id: 'metric-1',
      athleteId,
      ...metricData,
    };

    athleteRepositoryMock.findById.mockResolvedValue(athlete);
    performanceMetricRepositoryMock.create.mockResolvedValue(newMetric);

    const result = await addPerformanceMetricService.execute(athleteId, metricData);

    expect(athleteRepositoryMock.findById).toHaveBeenCalledWith(athleteId);
    expect(performanceMetricRepositoryMock.create).toHaveBeenCalled();
    expect(cacheUtils.invalidateAthleteMetricsCache).toHaveBeenCalledWith(athleteId);
    expect(result).toEqual(newMetric);
  });

});
