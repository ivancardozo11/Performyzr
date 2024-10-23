// tests/unit/interfaces/http/controllers/GetAthleteByIdController.test.ts

import 'reflect-metadata';
import { AthleteController } from '../../../../../src/interfaces/http/controllers/AthleteController';
import { GetAthleteByIdService } from '../../../../../src/application/services/Athlete/GetAthleteByIdService';
import { Athlete } from '../../../../../src/domain/models/Athlete';
import { Context } from 'hono';
import { mockDeep, MockProxy } from 'jest-mock-extended';

describe('AthleteController - getAthleteById', () => {
  let athleteController: AthleteController;
  let getAthleteByIdServiceMock: MockProxy<GetAthleteByIdService>;

  beforeEach(() => {
    getAthleteByIdServiceMock = mockDeep<GetAthleteByIdService>();

    athleteController = new AthleteController(
      mockDeep(), 
      mockDeep(),
      getAthleteByIdServiceMock,
      mockDeep(),
      mockDeep()
    );
  });

  it('Get an athlete by ID correctly', async () => {
    const athleteId = 'athlete-1';
    const athlete: Athlete = {
      id: athleteId,
      name: 'John Doe',
      age: 25,
      team: 'Team A',
      createdAt: new Date('2024-10-23T04:09:24.897Z'),
    };

    getAthleteByIdServiceMock.execute.mockResolvedValue(athlete);

    const c = mockDeep<Context>();
    c.req.param.mockReturnValue(athleteId);

    await athleteController.getAthleteById(c);

    expect(getAthleteByIdServiceMock.execute).toHaveBeenCalledWith(athleteId);

    const [actualResponse, actualStatus] = c.json.mock.calls[0];
    const serializedActualResponse = JSON.parse(JSON.stringify(actualResponse));

    const expectedAthlete = {
      ...athlete,
      createdAt: athlete.createdAt.toISOString(),
    };

    expect(serializedActualResponse).toEqual(expectedAthlete);

    expect(actualStatus).toBe(200);
  });

  it('debe devolver error si el atleta no existe', async () => {
    const athleteId = 'non-existent-id';

    getAthleteByIdServiceMock.execute.mockResolvedValue(null);

    const c = mockDeep<Context>();
    c.req.param.mockReturnValue(athleteId);

    await athleteController.getAthleteById(c);

    expect(getAthleteByIdServiceMock.execute).toHaveBeenCalledWith(athleteId);

    const [actualResponse, actualStatus] = c.json.mock.calls[0];

    expect(actualResponse).toEqual({ message: 'Athlete not found' });
    expect(actualStatus).toBe(404);
  });
});
