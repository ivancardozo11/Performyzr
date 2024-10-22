export class MetricType {
  private readonly validTypes = ['speed', 'strength', 'stamina'];
  private readonly metricType: string;

  constructor(metricType: string) {
    if (!this.validTypes.includes(metricType.toLowerCase())) {
      throw new Error(`Invalid metric type: ${metricType}`);
    }
    this.metricType = metricType.toLowerCase();
  }

  value(): string {
    return this.metricType;
  }
}
