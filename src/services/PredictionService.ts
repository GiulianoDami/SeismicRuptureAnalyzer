typescript
import { SeismicData, PredictionResult } from '../types';
import { RupturePatternAnalyzer } from './RupturePatternAnalyzer';

export class PredictionService {
  private analyzer: RupturePatternAnalyzer;

  constructor() {
    this.analyzer = new RupturePatternAnalyzer();
  }

  predictSeismicActivity(data: SeismicData): PredictionResult {
    const { 
      magnitude, 
      depth, 
      duration, 
      faultOrientation, 
      thermalGradient 
    } = data;

    // Analyze rupture pattern for anomalies
    const patternAnalysis = this.analyzer.analyzePattern({
      magnitude,
      depth,
      duration,
      faultOrientation,
      thermalGradient
    });

    // Calculate probability of anomalous behavior
    const anomalyProbability = this.calculateAnomalyProbability(
      magnitude,
      depth,
      thermalGradient,
      patternAnalysis
    );

    // Determine if this could indicate unexpected seismic activity
    const isUnexpected = this.determineUnexpectedActivity(
      magnitude,
      depth,
      patternAnalysis
    );

    return {
      isAnomalous: anomalyProbability > 0.7,
      anomalyProbability,
      isUnexpected,
      confidence: this.calculateConfidence(anomalyProbability),
      recommendations: this.generateRecommendations(
        patternAnalysis,
        isUnexpected
      ),
      timestamp: new Date()
    };
  }

  private calculateAnomalyProbability(
    magnitude: number,
    depth: number,
    thermalGradient: number,
    patternAnalysis: any
  ): number {
    let probability = 0;

    // Depth anomaly factor (deeper than typical ranges)
    if (depth > 60) probability += 0.3;
    
    // Magnitude anomaly factor (unexpectedly high for depth)
    if (magnitude > 7.0 && depth > 55) probability += 0.25;
    
    // Thermal gradient anomaly
    if (thermalGradient > 30) probability += 0.2;
    
    // Pattern analysis factors
    probability += patternAnalysis.patternScore * 0.25;
    
    // Normalize to 0-1 range
    return Math.min(1, probability);
  }

  private determineUnexpectedActivity(
    magnitude: number,
    depth: number,
    patternAnalysis: any
  ): boolean {
    // Criteria for unexpected activity:
    // 1. Deep focus (>60km) with significant magnitude
    // 2. Unusual rupture pattern
    // 3. High stress concentration
    
    const deepFocus = depth > 60;
    const significantMagnitude = magnitude > 7.0;
    const unusualPattern = patternAnalysis.patternScore > 0.7;
    
    return deepFocus && significantMagnitude && unusualPattern;
  }

  private calculateConfidence(probability: number): number {
    // Confidence decreases as probability approaches 0.5
    return Math.max(0.5, 1 - Math.abs(probability - 0.5));
  }

  private generateRecommendations(
    patternAnalysis: any,
    isUnexpected: boolean
  ): string[] {
    const recommendations: string[] = [];
    
    if (isUnexpected) {
      recommendations.push(
        'Investigate potential deep-focus rupture mechanisms',
        'Monitor for possible aftershock sequences',
        'Validate with additional seismic stations'
      );
    }
    
    if (patternAnalysis.stressConcentration > 0.8) {
      recommendations.push(
        'High stress concentration detected - increased monitoring recommended'
      );
    }
    
    if (patternAnalysis.ruptureVelocity > 3.0) {
      recommendations.push(
        'Unusually fast rupture velocity - potential for larger magnitude event'
      );
    }
    
    if (recommendations.length === 0) {
      recommendations.push('No immediate concerns identified');
    }
    
    return recommendations;
  }
}