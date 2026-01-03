typescript
export interface SeismicData {
  magnitude: number;
  depth: number;
  duration: number;
  faultOrientation: string;
  thermalGradient: number;
}

export interface AnalysisResult {
  isAnomalous: boolean;
  confidence: number;
  indicators: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export class AnalysisEngineService {
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

  public analyze(seismicData: SeismicData): AnalysisResult {
    const indicators: string[] = [];
    let confidence = 0;

    // Check depth range anomaly
    if (seismicData.depth < this.depthRange[0] || seismicData.depth > this.depthRange[1]) {
      indicators.push('out-of-range-depth');
      confidence += 20;
    }

    // Check temperature threshold
    if (seismicData.thermalGradient > this.temperatureThreshold) {
      indicators.push('high-thermal-gradient');
      confidence += 25;
    }

    // Check pressure factor influence
    const expectedPressure = seismicData.depth * this.pressureFactor;
    if (expectedPressure > 1000) {
      indicators.push('high-pressure-condition');
      confidence += 15;
    }

    // Check rock composition effects
    const relevantRocks = this.rockComposition.filter(rock => 
      ['basalt', 'andesite'].includes(rock)
    );
    if (relevantRocks.length > 0) {
      indicators.push('composition-sensitive-rock');
      confidence += 20;
    }

    // Check rupture velocity anomalies
    const ruptureVelocity = seismicData.magnitude / seismicData.duration;
    if (ruptureVelocity > 3.5) {
      indicators.push('unusual-rupture-velocity');
      confidence += 20;
    }

    // Determine if pattern is anomalous
    const isAnomalous = indicators.length >= 2 || confidence >= 50;

    // Calculate risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (confidence >= 70) riskLevel = 'high';
    else if (confidence >= 40) riskLevel = 'medium';

    return {
      isAnomalous,
      confidence,
      indicators,
      riskLevel
    };
  }
}