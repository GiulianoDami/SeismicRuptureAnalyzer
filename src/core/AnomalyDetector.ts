typescript
export interface RuptureData {
  magnitude: number;
  depth: number;
  duration: number;
  faultOrientation: string;
  thermalGradient: number;
}

export interface AnomalyResult {
  isAnomalous: boolean;
  confidence: number;
  anomalies: string[];
}

export class AnomalyDetector {
  private depthRange: [number, number];
  private temperatureThreshold: number;
  private pressureFactor: number;
  private rockComposition: string[];

  constructor(
    depthRange: [number, number],
    temperatureThreshold: number,
    pressureFactor: number,
    rockComposition: string[]
  ) {
    this.depthRange = depthRange;
    this.temperatureThreshold = temperatureThreshold;
    this.pressureFactor = pressureFactor;
    this.rockComposition = rockComposition;
  }

  public detectAnomalies(data: RuptureData): AnomalyResult {
    const anomalies: string[] = [];
    let confidence = 0;

    // Check for unusual depth range
    if (data.depth < this.depthRange[0] || data.depth > this.depthRange[1]) {
      anomalies.push('Unusual depth range');
      confidence += 20;
    }

    // Check for extreme thermal gradients
    if (data.thermalGradient > this.temperatureThreshold) {
      anomalies.push('Extreme thermal gradient');
      confidence += 25;
    }

    // Check for pressure anomalies
    const expectedPressure = data.depth * this.pressureFactor;
    if (data.magnitude > 7.0 && data.depth > 50 && data.duration < 30) {
      anomalies.push('High magnitude with low duration at great depth');
      confidence += 30;
    }

    // Check for unusual fault orientation
    if (data.faultOrientation === 'north-south' && data.depth > 60) {
      anomalies.push('Unusual fault orientation at great depth');
      confidence += 15;
    }

    // Check for rock composition anomalies
    if (!this.rockComposition.includes('basalt') && !this.rockComposition.includes('andesite')) {
      anomalies.push('Unusual rock composition');
      confidence += 10;
    }

    // Calculate final confidence score
    confidence = Math.min(confidence, 100);

    return {
      isAnomalous: anomalies.length > 0,
      confidence,
      anomalies
    };
  }
}