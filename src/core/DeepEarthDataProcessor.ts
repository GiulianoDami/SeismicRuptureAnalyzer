typescript
export interface GeologicalData {
  depth: number;
  temperature: number;
  pressure: number;
  rockComposition: string[];
  thermalGradient: number;
  stressField: {
    magnitude: number;
    direction: string;
  };
}

export interface RupturePattern {
  magnitude: number;
  depth: number;
  duration: number;
  faultOrientation: string;
  ruptureVelocity: number;
  energyRelease: number;
}

export interface AnomalyDetectionResult {
  isAnomalous: boolean;
  confidence: number;
  anomalies: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export class DeepEarthDataProcessor {
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

  processGeologicalData(data: GeologicalData): RupturePattern {
    const { depth, temperature, pressure, thermalGradient } = data;

    // Validate depth range
    if (depth < this.depthRange[0] || depth > this.depthRange[1]) {
      throw new Error(`Depth ${depth}km is outside the valid range ${this.depthRange[0]}-${this.depthRange[1]}km`);
    }

    // Calculate rupture velocity based on pressure and temperature
    const ruptureVelocity = this.calculateRuptureVelocity(temperature, pressure, thermalGradient);

    // Calculate energy release
    const energyRelease = this.calculateEnergyRelease(depth, temperature, pressure);

    return {
      magnitude: this.calculateMagnitude(depth, temperature, pressure),
      depth,
      duration: this.calculateDuration(depth, ruptureVelocity),
      faultOrientation: data.stressField.direction,
      ruptureVelocity,
      energyRelease
    };
  }

  private calculateRuptureVelocity(temperature: number, pressure: number, thermalGradient: number): number {
    // Simplified model for rupture velocity calculation
    const baseVelocity = 3.5; // km/s
    const tempEffect = (temperature - this.temperatureThreshold) * 0.001;
    const pressureEffect = pressure * 0.0001;
    const gradientEffect = thermalGradient * 0.01;

    return Math.max(0.5, baseVelocity + tempEffect + pressureEffect + gradientEffect);
  }

  private calculateEnergyRelease(depth: number, temperature: number, pressure: number): number {
    // Simplified energy release calculation
    const depthFactor = Math.log(depth + 1);
    const tempFactor = Math.max(0, temperature - 600) / 100;
    const pressureFactor = pressure / 1000;

    return depthFactor * tempFactor * pressureFactor * 1e15;
  }

  private calculateMagnitude(depth: number, temperature: number, pressure: number): number {
    // Simplified magnitude calculation based on deep earth parameters
    const depthEffect = Math.max(0, (this.depthRange[1] - depth) / 10);
    const tempEffect = Math.max(0, (temperature - 500) / 100);
    const pressureEffect = pressure / 500;

    return 5.0 + depthEffect + tempEffect + pressureEffect;
  }

  private calculateDuration(depth: number, ruptureVelocity: number): number {
    // Simplified duration calculation
    const distance = depth * 2; // Approximate fault length
    return distance / ruptureVelocity;
  }

  detectAnomalies(pattern: RupturePattern): AnomalyDetectionResult {
    const anomalies: string[] = [];
    let confidence = 0;

    // Check for unusual depth
    if (pattern.depth < this.depthRange[0] || pattern.depth > this.depthRange[1]) {
      anomalies.push('Unusual depth for expected rupture pattern');
      confidence += 0.3;
    }

    // Check for high rupture velocity
    if (pattern.ruptureVelocity > 4.0) {
      anomalies.push('Unusually high rupture velocity');
      confidence += 0.4;
    }

    // Check for anomalous energy release
    if (pattern.energyRelease > 1e16) {
      anomalies.push('Excessive energy release');
      confidence += 0.3;
    }

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (confidence > 0.7) {
      riskLevel = 'high';
    } else if (confidence > 0.4) {
      riskLevel = 'medium';
    }

    return {
      isAnomalous: anomalies.length > 0,
      confidence,
      anomalies,
      riskLevel
    };
  }
}