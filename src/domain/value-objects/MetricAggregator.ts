export class MetricAggregator {
  static calculateAverage(values: number[]): number {
    const sum = values.reduce((total, value) => total + value, 0);
    return sum / values.length;
  }

  static calculateStandardDeviation(values: number[], average: number): number {
    const variance =
      values.reduce((total, value) => total + Math.pow(value - average, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  static getDefaultAggregate(): { average: number; max: number; min: number; count: number; standardDeviation: number } {
    return { average: 0, max: 0, min: 0, count: 0, standardDeviation: 0 };
  }
}
