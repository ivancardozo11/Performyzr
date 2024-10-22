export function calculateLinearRegression(data: { x: number; y: number }[]): { slope: number; intercept: number } {
    const n = data.length;
    const sumX = data.reduce((acc, point) => acc + point.x, 0);
    const sumY = data.reduce((acc, point) => acc + point.y, 0);
    const sumXY = data.reduce((acc, point) => acc + point.x * point.y, 0);
    const sumX2 = data.reduce((acc, point) => acc + point.x * point.x, 0);
  
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
  
    return { slope, intercept };
  }
  
  export function predictFutureValue(slope: number, intercept: number, futureX: number): number {
    return slope * futureX + intercept;
  }
  