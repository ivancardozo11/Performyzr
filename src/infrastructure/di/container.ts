import 'reflect-metadata';
import { Container } from 'inversify';
import { AthleteController } from '../../interfaces/http/controllers/AthleteController';
import { CreateAthleteService } from '../../application/services/Athlete/CreateAthleteService';
import { AddPerformanceMetricService } from '../../application/services/PerformanceMetric/AddPerformanceMetricService';
import { GetMetricsService } from '../../application/services/PerformanceMetric/GetMetricsService';
import { GetAllAthletesService } from '../../application/services/Athlete/GetAllAthletesService';
import { GetAthleteByIdService } from '../../application/services/Athlete/GetAthleteByIdService';
import { UpdateAthleteService } from '../../application/services/Athlete/UpdateAthleteService';
import { DeleteAthleteService } from '../../application/services/Athlete/DeleteAthleteService';
import { IAthleteRepository } from '../../domain/repositories/IAthleteRepository';
import { IPerformanceMetricRepository } from '../../domain/repositories/IPerformanceMetricRepository';
import { AthleteRepository } from '../repositories/AthleteRepository';
import { PerformanceMetricRepository } from '../repositories/PerformanceMetricRepository';
import { PerformanceMetricController } from '../../interfaces/http/controllers/PerformanceMetricController';




const container = new Container();

container.bind<AthleteController>(AthleteController).to(AthleteController);
container.bind<PerformanceMetricController>(PerformanceMetricController).to(PerformanceMetricController);

container.bind<CreateAthleteService>(CreateAthleteService).to(CreateAthleteService);
container.bind<AddPerformanceMetricService>(AddPerformanceMetricService).to(AddPerformanceMetricService);
container.bind<GetAllAthletesService>(GetAllAthletesService).to(GetAllAthletesService);
container.bind<GetAthleteByIdService>(GetAthleteByIdService).to(GetAthleteByIdService);
container.bind<GetMetricsService>(GetMetricsService).to(GetMetricsService);
container.bind<UpdateAthleteService>(UpdateAthleteService).to(UpdateAthleteService);
container.bind<DeleteAthleteService>(DeleteAthleteService).to(DeleteAthleteService);

container.bind<IAthleteRepository>('IAthleteRepository').to(AthleteRepository);
container.bind<IPerformanceMetricRepository>('IPerformanceMetricRepository').to(PerformanceMetricRepository);


export default container;
