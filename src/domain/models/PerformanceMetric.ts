export class PerformanceMetric {
  id: string;
  athleteId: string;
  metricType: string;
  value: number;
  unit: string;
  timestamp: Date;

  constructor(
    id: string,
    athleteId: string,
    metricType: string,
    value: number,
    unit: string,
    timestamp: Date
  ) {
    this.id = id;
    this.athleteId = athleteId;
    this.metricType = metricType;
    this.value = value;
    this.unit = unit;
    this.timestamp = timestamp;
  }
}
