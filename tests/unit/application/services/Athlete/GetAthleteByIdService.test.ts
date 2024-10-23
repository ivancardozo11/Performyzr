import 'reflect-metadata';
import { GetAthleteByIdService } from '../../../../../src/application/services/Athlete/GetAthleteByIdService';
import { IAthleteRepository } from '../../../../../src/domain/repositories/IAthleteRepository';
import { Athlete } from '../../../../../src/domain/models/Athlete';
import { mock } from 'jest-mock-extended';

describe('GetAthleteByIdService', () => {
  let getAthleteByIdService: GetAthleteByIdService;
  let athleteRepositoryMock: jest.Mocked<IAthleteRepository>;

  beforeEach(() => {
    athleteRepositoryMock = mock<IAthleteRepository>();
    getAthleteByIdService = new GetAthleteByIdService(athleteRepositoryMock);
  });

  it('must get an athlete by ID correctly', async () => {
    const athleteId = 'uuid-123';
    const athlete: Athlete = {
      id: athleteId,
      name: 'John Doe',
      age: 25,
      team: 'Team A',
      createdAt: new Date(),
    };

    athleteRepositoryMock.findById.mockResolvedValue(athlete);

    const result = await getAthleteByIdService.execute(athleteId);

    expect(athleteRepositoryMock.findById).toHaveBeenCalledWith(athleteId);
    expect(result).toEqual(athlete);
  });

  it('should return null if the athlete does not exist', async () => {
    const athleteId = 'non-existent-id';

    athleteRepositoryMock.findById.mockResolvedValue(null);

    const result = await getAthleteByIdService.execute(athleteId);

    expect(athleteRepositoryMock.findById).toHaveBeenCalledWith(athleteId);
    expect(result).toBeNull();
  });
});
