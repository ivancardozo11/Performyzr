
import 'reflect-metadata';
import { CreateAthleteService } from '../../../../../src/application/services/Athlete/CreateAthleteService';
import { IAthleteRepository } from '../../../../../src/domain/repositories/IAthleteRepository';
import { Athlete } from '../../../../../src/domain/models/Athlete';
import { mock } from 'jest-mock-extended';

describe('CreateAthleteService', () => {
  let createAthleteService: CreateAthleteService;
  let athleteRepositoryMock: jest.Mocked<IAthleteRepository>;

  beforeEach(() => {
    athleteRepositoryMock = mock<IAthleteRepository>();
    createAthleteService = new CreateAthleteService(athleteRepositoryMock);
  });

  it('Should create an Athlete', async () => {
    const athleteData: Omit<Athlete, 'id'> = {
      name: 'John Doe',
      age: 25,
      team: 'Team A',
      createdAt: new Date(),
    };

    const createdAthlete: Athlete = {
      id: 'uuid-123',
      ...athleteData,
    };

    athleteRepositoryMock.create.mockResolvedValue(createdAthlete);

    const result = await createAthleteService.execute(athleteData);

    expect(athleteRepositoryMock.create).toHaveBeenCalledWith(athleteData);
    expect(result).toEqual(createdAthlete);
  });
});
