typescript
export class RuptureVelocityCalculator {
  /**
   * Calculates the rupture velocity based on seismic parameters
   * @param magnitude - Earthquake magnitude
   * @param depth - Depth in kilometers
   * @param duration - Duration in seconds
   * @returns Rupture velocity in km/s
   */
  static calculateRuptureVelocity(
    magnitude: number,
    depth: number,
    duration: number
  ): number {
    // Base velocity calculation using empirical relationships
    const baseVelocity = Math.pow(10, 0.5 * magnitude - 2.5);
    
    // Adjust for depth effects (deeper earthquakes typically have slower ruptures)
    const depthFactor = Math.max(0.5, 1.0 - (depth / 1000));
    
    // Adjust for duration effects
    const durationFactor = Math.min(1.5, 1.0 + (duration / 100));
    
    // Calculate final rupture velocity
    const velocity = baseVelocity * depthFactor * durationFactor;
    
    return Math.min(velocity, 4.0); // Cap at maximum possible velocity
  }

  /**
   * Calculates the maximum possible rupture velocity for given parameters
   * @param depth - Depth in kilometers
   * @param temperature - Temperature in Celsius
   * @param pressure - Pressure in GPa
   * @returns Maximum rupture velocity in km/s
   */
  static calculateMaxRuptureVelocity(
    depth: number,
    temperature: number,
    pressure: number
  ): number {
    // Empirical relationship for maximum rupture velocity
    // Based on thermal and pressure conditions
    const thermalEffect = Math.exp(-temperature / 1000);
    const pressureEffect = 1.0 / (1.0 + pressure / 10);
    const depthEffect = Math.max(0.1, 1.0 - (depth / 500));
    
    // Maximum velocity calculation
    const maxVelocity = 3.5 * thermalEffect * pressureEffect * depthEffect;
    
    return Math.max(0.5, maxVelocity);
  }

  /**
   * Determines if rupture velocity is anomalous
   * @param observedVelocity - Observed rupture velocity
   * @param maxVelocity - Maximum possible rupture velocity
   * @returns Boolean indicating if velocity is anomalous
   */
  static isAnomalousVelocity(
    observedVelocity: number,
    maxVelocity: number
  ): boolean {
    const ratio = observedVelocity / maxVelocity;
    return ratio > 1.2; // Velocity exceeds 120% of maximum as anomalous
  }
}