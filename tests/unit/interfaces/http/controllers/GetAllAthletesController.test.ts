// tests/unit/interfaces/http/controllers/GetAllAthletesController.test.ts

import 'reflect-metadata';
import { AthleteController } from '../../../../../src/interfaces/http/controllers/AthleteController';
import { GetAllAthletesService } from '../../../../../src/application/services/Athlete/GetAllAthletesService';
import { Athlete } from '../../../../../src/domain/models/Athlete';
import { Context } from 'hono';
import { mockDeep, MockProxy } from 'jest-mock-extended';

describe('AthleteController - getAllAthletes', () => {
  let athleteController: AthleteController;
  let getAllAthletesServiceMock: MockProxy<GetAllAthletesService>;

  beforeEach(() => {
    getAllAthletesServiceMock = mockDeep<GetAllAthletesService>();

    athleteController = new AthleteController(
      mockDeep(),
      getAllAthletesServiceMock,
      mockDeep(),
      mockDeep(),
      mockDeep()
    );
  });

  it('Should get all athletes correctly', async () => {
    const athletes: Athlete[] = [
      {
        id: 'athlete-1',
        name: 'John Doe',
        age: 25,
        team: 'Team A',
        createdAt: new Date('2024-10-23T04:09:24.897Z'),
      },
      {
        id: 'athlete-2',
        name: 'Jane Smith',
        age: 28,
        team: 'Team B',
        createdAt: new Date('2024-10-23T04:10:24.897Z'),
      },
    ];

    getAllAthletesServiceMock.execute.mockResolvedValue(athletes);

    const c = mockDeep<Context>();

    await athleteController.getAllAthletes(c);

    expect(getAllAthletesServiceMock.execute).toHaveBeenCalled();

    const [actualResponse, actualStatus] = c.json.mock.calls[0];

    const serializedActualResponse = JSON.parse(JSON.stringify(actualResponse));

    const expectedAthletes = athletes.map(athlete => ({
      ...athlete,
      createdAt: athlete.createdAt.toISOString(),
    }));

    expect(serializedActualResponse).toEqual(expectedAthletes);

    expect(actualStatus).toBe(200);
  });

  it('Should get all athletes correctly', async () => {
    getAllAthletesServiceMock.execute.mockResolvedValue([]);

    const c = mockDeep<Context>();

    await athleteController.getAllAthletes(c);

    expect(getAllAthletesServiceMock.execute).toHaveBeenCalled();

    const [actualResponse, actualStatus] = c.json.mock.calls[0];

    expect(actualResponse).toEqual({ message: 'No athletes found' });
    expect(actualStatus).toBe(404);
  });
});
