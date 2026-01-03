typescript
export interface StressParameters {
  normalStress: number; // MPa
  shearStress: number; // MPa
  rockDensity: number; // g/cm³
  depth: number; // km
  frictionCoefficient: number;
}

export interface StressResult {
  stressState: 'stable' | 'critical' | 'unstable';
  safetyFactor: number;
  shearStressThreshold: number;
  normalStress: number;
  shearStress: number;
}

/**
 * Calculates stress states in geological formations based on depth, rock properties, and applied forces
 */
export class StressCalculator {
  private static readonly GRAVITY = 9.81; // m/s²
  private static readonly MPa_TO_PASCALS = 1e6;

  /**
   * Calculate stress state at given depth
   * @param params - Stress parameters including depth, stresses, and material properties
   * @returns Stress analysis results
   */
  static calculateStressState(params: StressParameters): StressResult {
    const { normalStress, shearStress, rockDensity, depth, frictionCoefficient } = params;
    
    // Calculate effective normal stress (accounting for hydrostatic pressure)
    const hydrostaticPressure = this.calculateHydrostaticPressure(rockDensity, depth);
    const effectiveNormalStress = normalStress - hydrostaticPressure;
    
    // Calculate shear stress threshold based on friction coefficient
    const shearStressThreshold = effectiveNormalStress * frictionCoefficient;
    
    // Calculate safety factor (ratio of available strength to required stress)
    const safetyFactor = shearStressThreshold / Math.max(shearStress, 1e-10);
    
    // Determine stress state based on safety factor
    let stressState: 'stable' | 'critical' | 'unstable';
    if (safetyFactor > 2.0) {
      stressState = 'stable';
    } else if (safetyFactor > 1.0) {
      stressState = 'critical';
    } else {
      stressState = 'unstable';
    }
    
    return {
      stressState,
      safetyFactor,
      shearStressThreshold,
      normalStress,
      shearStress
    };
  }

  /**
   * Calculate hydrostatic pressure at given depth
   * @param density - Rock density in g/cm³
   * @param depth - Depth in km
   * @returns Hydrostatic pressure in MPa
   */
  private static calculateHydrostaticPressure(density: number, depth: number): number {
    // Convert density to kg/m³ and depth to meters
    const densityKgPerM3 = density * 1000;
    const depthMeters = depth * 1000;
    
    // Calculate pressure in Pascals then convert to MPa
    const pressurePascals = densityKgPerM3 * this.GRAVITY * depthMeters;
    return pressurePascals / this.MPa_TO_PASCALS;
  }

  /**
   * Calculate maximum shear stress for given normal stress and friction coefficient
   * @param normalStress - Normal stress in MPa
   * @param frictionCoefficient - Friction coefficient
   * @returns Maximum allowable shear stress in MPa
   */
  static calculateMaximumShearStress(normalStress: number, frictionCoefficient: number): number {
    return normalStress * frictionCoefficient;
  }

  /**
   * Calculate stress intensity factor for rupture propagation analysis
   * @param normalStress - Normal stress in MPa
   * @param shearStress - Shear stress in MPa
   * @param rockDensity - Rock density in g/cm³
   * @param depth - Depth in km
   * @returns Stress intensity factor (dimensionless)
   */
  static calculateStressIntensity(
    normalStress: number, 
    shearStress: number, 
    rockDensity: number, 
    depth: number
  ): number {
    const hydrostaticPressure = this.calculateHydrostaticPressure(rockDensity, depth);
    const effectiveNormalStress = normalStress - hydrostaticPressure;
    
    // Simplified stress intensity calculation
    return Math.sqrt(Math.pow(effectiveNormalStress, 2) + 3 * Math.pow(shearStress, 2));
  }
}