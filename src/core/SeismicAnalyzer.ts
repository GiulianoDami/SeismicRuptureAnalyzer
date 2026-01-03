typescript
export interface SeismicParameters {
  depthRange: [number, number];
  temperatureThreshold: number;
  pressureFactor: number;
  rockComposition: string[];
}

export interface RuptureData {
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

export class SeismicAnalyzer {
  private params: SeismicParameters;

  constructor(params: SeismicParameters) {
    this.params = params;
  }

  analyzeRupturePattern(data: RuptureData): AnalysisResult {
    const indicators: string[] = [];
    let confidence = 0;

    // Check depth range
    const [minDepth, maxDepth] = this.params.depthRange;
    if (data.depth < minDepth || data.depth > maxDepth) {
      indicators.push('depth_outside_normal_range');
      confidence += 20;
    }

    // Check temperature threshold
    if (data.thermalGradient > this.params.temperatureThreshold) {
      indicators.push('unusual_thermal_gradient');
      confidence += 25;
    }

    // Check pressure factor
    if (data.magnitude > 7.0 && data.depth > 50) {
      indicators.push('high_magnitude_deep_event');
      confidence += 30;
    }

    // Check rock composition compatibility
    const compatibleRocks = ['basalt', 'andesite', 'gabbro'];
    const hasCompatibleRock = this.params.rockComposition.some(rock => 
      compatibleRocks.includes(rock)
    );
    
    if (!hasCompatibleRock) {
      indicators.push('unusual_rock_composition');
      confidence += 15;
    }

    // Check fault orientation for anomalies
    if (data.faultOrientation.toLowerCase().includes('vertical')) {
      indicators.push('vertical_fault_orientation');
      confidence += 10;
    }

    // Calculate risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (confidence >= 50) riskLevel = 'high';
    else if (confidence >= 30) riskLevel = 'medium';

    return {
      isAnomalous: confidence > 30,
      confidence,
      indicators,
      riskLevel
    };
  }
}