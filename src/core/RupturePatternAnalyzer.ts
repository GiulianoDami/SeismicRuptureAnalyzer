typescript
export interface RupturePattern {
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

export class RupturePatternAnalyzer {
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

  analyze(pattern: RupturePattern): AnalysisResult {
    const indicators: string[] = [];
    let confidence = 0;

    // Check depth range
    if (pattern.depth < this.depthRange[0] || pattern.depth > this.depthRange[1]) {
      indicators.push('depth_outside_normal_range');
      confidence += 0.2;
    }

    // Check temperature gradient
    if (pattern.thermalGradient > this.temperatureThreshold) {
      indicators.push('unusual_thermal_gradient');
      confidence += 0.3;
    }

    // Check rock composition
    const compatibleRocks = this.rockComposition.filter(rock => 
      ['basalt', 'andesite', 'gabbro'].includes(rock)
    );
    
    if (compatibleRocks.length === 0) {
      indicators.push('incompatible_rock_composition');
      confidence += 0.1;
    }

    // Check rupture velocity (simplified model)
    const ruptureVelocity = pattern.magnitude * 100 / pattern.duration;
    if (ruptureVelocity > 2500) {
      indicators.push('abnormally_high_rupture_velocity');
      confidence += 0.4;
    }

    // Check for anomalous behavior indicators
    const isAnomalous = indicators.length > 0;

    // Calculate risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (confidence >= 0.7) {
      riskLevel = 'high';
    } else if (confidence >= 0.4) {
      riskLevel = 'medium';
    }

    return {
      isAnomalous,
      confidence,
      indicators,
      riskLevel
    };
  }
}