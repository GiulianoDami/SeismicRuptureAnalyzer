typescript
export interface RuptureBehavior {
  /**
   * Indicates whether the rupture behavior is anomalous
   * based on deviation from expected seismic patterns
   */
  isAnomalous: boolean;

  /**
   * The calculated rupture velocity in km/s
   */
  ruptureVelocity: number;

  /**
   * Thermal conditions at the rupture site
   */
  thermalConditions: {
    temperature: number; // Celsius
    gradient: number; // Celsius per km
    anomalyScore: number; // 0-1 scale indicating thermal anomaly
  };

  /**
   * Pressure conditions at the rupture site
   */
  pressureConditions: {
    pressure: number; // MPa
    stressRatio: number; // Ratio of shear to normal stress
    anomalyScore: number; // 0-1 scale indicating pressure anomaly
  };

  /**
   * Fault characteristics that may indicate unexpected behavior
   */
  faultCharacteristics: {
    orientation: string; // e.g., 'north-south', 'east-west'
    slipRate: number; // mm/year
    complexityIndex: number; // 0-1 scale indicating fault complexity
  };

  /**
   * Predicted risk level for unexpected seismic activity
   */
  riskLevel: 'low' | 'medium' | 'high' | 'critical';

  /**
   * Confidence score for the analysis (0-1)
   */
  confidence: number;

  /**
   * Key findings from the rupture behavior analysis
   */
  findings: string[];
}