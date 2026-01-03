typescript
export interface IPredictionModel {
  predictRuptureBehavior(
    seismicData: {
      magnitude: number;
      depth: number;
      duration: number;
      faultOrientation: string;
      thermalGradient: number;
      pressureConditions: number;
    }
  ): Promise<{
    isAnomalous: boolean;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    predictedMagnitude?: number;
    ruptureVelocity?: number;
    faultStress?: number;
  }>;
}