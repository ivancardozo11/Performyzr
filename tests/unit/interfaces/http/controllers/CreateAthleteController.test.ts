import 'reflect-metadata';
import { AthleteController } from '../../../../../src/interfaces/http/controllers/AthleteController';
import { CreateAthleteService } from '../../../../../src/application/services/Athlete/CreateAthleteService';
import { GetAllAthletesService } from '../../../../../src/application/services/Athlete/GetAllAthletesService';
import { GetAthleteByIdService } from '../../../../../src/application/services/Athlete/GetAthleteByIdService';
import { UpdateAthleteService } from '../../../../../src/application/services/Athlete/UpdateAthleteService';
import { DeleteAthleteService } from '../../../../../src/application/services/Athlete/DeleteAthleteService';
import { Athlete } from '../../../../../src/domain/models/Athlete';
import { Context } from 'hono';
import { mockDeep, MockProxy } from 'jest-mock-extended';

describe('AthleteController', () => {
  let athleteController: AthleteController;
  let createAthleteServiceMock: MockProxy<CreateAthleteService>;

  beforeEach(() => {
    createAthleteServiceMock = mockDeep<CreateAthleteService>();

    athleteController = new AthleteController(
      createAthleteServiceMock,
      mockDeep<GetAllAthletesService>(),
      mockDeep<GetAthleteByIdService>(),
      mockDeep<UpdateAthleteService>(),
      mockDeep<DeleteAthleteService>()
    );
  });

  it('should create a new athlete and return the expected response', async () => {
    const requestData = {
      name: 'Juan Pérez',
      age: 25,
      team: 'Equipo A',
    };

    const createdAthlete: Athlete = {
      id: '00d30dfb-d228-4e9c-af3e-b5c6a5b81cd9',
      ...requestData,
      createdAt: new Date('2024-10-23T04:09:24.897Z'),
    };

    createAthleteServiceMock.execute.mockResolvedValue(createdAthlete);

    const c = mockDeep<Context>();

    c.req.json.mockResolvedValue(requestData);

    await athleteController.createAthlete(c);

    expect(createAthleteServiceMock.execute).toHaveBeenCalledWith(requestData);

    const [actualResponse, actualStatus] = c.json.mock.calls[0];
    const serializedActualResponse = JSON.parse(JSON.stringify(actualResponse));

    expect(serializedActualResponse).toEqual({
      message: 'Athlete created successfully',
      data: {
        id: '00d30dfb-d228-4e9c-af3e-b5c6a5b81cd9',
        name: 'Juan Pérez',
        age: 25,
        team: 'Equipo A',
        createdAt: '2024-10-23T04:09:24.897Z',
      },
    });

    expect(actualStatus).toBeUndefined();
  });
});
