typescript
export interface GeologicalDataModel {
  /**
   * Depth range in kilometers
   */
  depthRange: [number, number];
  
  /**
   * Temperature threshold in Celsius
   */
  temperatureThreshold: number;
  
  /**
   * Pressure factor affecting rupture behavior
   */
  pressureFactor: number;
  
  /**
   * Rock composition types
   */
  rockComposition: string[];
  
  /**
   * Thermal gradient in degrees Celsius per kilometer
   */
  thermalGradient?: number;
  
  /**
   * Stress propagation rate
   */
  stressPropagationRate?: number;
  
  /**
   * Rupture velocity in kilometers per second
   */
  ruptureVelocity?: number;
  
  /**
   * Fault orientation in degrees
   */
  faultOrientation?: number;
  
  /**
   * Expected magnitude range
   */
  expectedMagnitudeRange?: [number, number];
  
  /**
   * Anomalous behavior indicators
   */
  anomalousIndicators?: {
    thermalAnomaly: boolean;
    pressureAnomaly: boolean;
    velocityAnomaly: boolean;
    compositionAnomaly: boolean;
  };
}