typescript
export interface PressureConditions {
  /**
   * Pressure in gigapascals (GPa)
   */
  pressure: number;
  
  /**
   * Depth in kilometers
   */
  depth: number;
  
  /**
   * Temperature in Celsius
   */
  temperature: number;
  
  /**
   * Pressure gradient in GPa/km
   */
  pressureGradient: number;
  
  /**
   * Lithostatic pressure in GPa
   */
  lithostaticPressure: number;
  
  /**
   * Pore pressure in GPa
   */
  porePressure: number;
  
  /**
   * Effective pressure in GPa
   */
  effectivePressure: number;
  
  /**
   * Pressure anomaly indicator
   */
  pressureAnomaly: number;
  
  /**
   * Indicates if pressure conditions are abnormal
   */
  isAbnormal: boolean;
}