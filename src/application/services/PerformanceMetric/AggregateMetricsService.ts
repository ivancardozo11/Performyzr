import { inject, injectable } from 'inversify';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository'; // Repositorio de atletas
import { MetricAggregateResult } from '../../../domain/interfaces/MetricAggregateResult';
import { MetricType } from '../../../domain/value-objects/MetricType';

@injectable()
export class AggregateMetricsService {
  constructor(
    @inject('IPerformanceMetricRepository') private performanceMetricRepository: IPerformanceMetricRepository,
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository // Inyección del repositorio de atletas
  ) {}

  async execute(athleteId: string, metricType?: string): Promise<MetricAggregateResult> {
    let validMetricType: string | undefined;

    const athleteExists = await this.athleteRepository.findById(athleteId);
    if (!athleteExists) {
      throw new Error('Athlete not found');
    }

    if (metricType) {
      const metricTypeObj = new MetricType(metricType);
      validMetricType = metricTypeObj.value();
    }

    return await this.performanceMetricRepository.aggregateByAthleteId(athleteId, validMetricType);
  }
}
