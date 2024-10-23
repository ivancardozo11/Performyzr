// tests/unit/application/services/Athlete/DeleteAthleteService.test.ts

import 'reflect-metadata'; 
import { DeleteAthleteService } from '../../../../../src/application/services/Athlete/DeleteAthleteService';
import { IAthleteRepository } from '../../../../../src/domain/repositories/IAthleteRepository';
import { mock, MockProxy } from 'jest-mock-extended';
import { Athlete } from '@prisma/client';

describe('DeleteAthleteService', () => {
  let deleteAthleteService: DeleteAthleteService;
  let athleteRepositoryMock: MockProxy<IAthleteRepository>;

  beforeEach(() => {
    athleteRepositoryMock = mock<IAthleteRepository>();

    deleteAthleteService = new DeleteAthleteService(athleteRepositoryMock);
  });

  it('Should eliminate an athlete if it exists', async () => {
    const athleteId = '00d30dfb-d228-4e9c-af3e-b5c6a5b81cd9';
    athleteRepositoryMock.findById.mockResolvedValue({ id: athleteId } as Athlete);

    await deleteAthleteService.execute(athleteId);
    expect(athleteRepositoryMock.findById).toHaveBeenCalledWith(athleteId);
    expect(athleteRepositoryMock.delete).toHaveBeenCalledWith(athleteId);
  });

  it('Should throw an error if the athlete does not exist', async () => {
    const athleteId = 'non-existent-id';
    athleteRepositoryMock.findById.mockResolvedValue(null);
    await expect(deleteAthleteService.execute(athleteId)).rejects.toThrow('Athlete not found');
    expect(athleteRepositoryMock.delete).not.toHaveBeenCalled();
  });
});
