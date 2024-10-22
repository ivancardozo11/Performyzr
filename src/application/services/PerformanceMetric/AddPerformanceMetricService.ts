import { inject, injectable } from 'inversify';
import { IAthleteRepository } from '../../../domain/repositories/IAthleteRepository';
import { IPerformanceMetricRepository } from '../../../domain/repositories/IPerformanceMetricRepository';
import { PerformanceMetric } from '../../../domain/models/PerformanceMetric';
import { invalidateAthleteMetricsCache } from '../../../utils/cacheUtils';



@injectable()
export class AddPerformanceMetricService {
  constructor(
    @inject('IAthleteRepository') private athleteRepository: IAthleteRepository,
    @inject('IPerformanceMetricRepository') private performanceMetricRepository: IPerformanceMetricRepository
  ) {}

  async execute(athleteId: string, data: Omit<PerformanceMetric, 'id' | 'athleteId'>): Promise<PerformanceMetric> {
    const athlete = await this.athleteRepository.findById(athleteId);
    if (!athlete) {
      throw new Error('Athlete not found');
    }
  
    const metricData = {
      athleteId,
      metricType: data.metricType.trim().toLowerCase(),
      value: Number(data.value),
      unit: data.unit.trim().toLowerCase(),
      timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
    };
  
    const newMetric = await this.performanceMetricRepository.create(metricData);
    
    await invalidateAthleteMetricsCache(athleteId);
    return newMetric;
  }
}
