import 'reflect-metadata';
import { Container } from 'inversify';
import { AthleteController } from '../../interfaces/http/controllers/AthleteController';
import { CreateAthleteService } from '../../application/services/Athlete/CreateAthleteService';
import { IAthleteRepository } from '../../domain/repositories/IAthleteRepository';
import { AthleteRepository } from '../repositories/AthleteRepository';

const container = new Container();

container.bind<AthleteController>(AthleteController).to(AthleteController);
container.bind<CreateAthleteService>(CreateAthleteService).to(CreateAthleteService);
container.bind<IAthleteRepository>('IAthleteRepository').to(AthleteRepository);

export default container;
