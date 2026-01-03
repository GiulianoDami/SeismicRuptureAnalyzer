typescript
export class ThermalCalculator {
  /**
   * Calculates the expected temperature at a given depth based on geothermal gradient
   * @param depth - Depth in kilometers
   * @param surfaceTemperature - Surface temperature in Celsius (default: 15°C)
   * @param geothermalGradient - Geothermal gradient in °C/km (default: 25°C/km)
   * @returns Expected temperature at depth in Celsius
   */
  static calculateExpectedTemperature(
    depth: number,
    surfaceTemperature: number = 15,
    geothermalGradient: number = 25
  ): number {
    return surfaceTemperature + (depth * geothermalGradient);
  }

  /**
   * Calculates the thermal stress factor based on temperature difference and material properties
   * @param currentTemperature - Current temperature in Celsius
   * @param referenceTemperature - Reference temperature in Celsius
   * @param thermalExpansionCoefficient - Coefficient of thermal expansion (default: 2.5e-6)
   * @returns Thermal stress factor
   */
  static calculateThermalStress(
    currentTemperature: number,
    referenceTemperature: number,
    thermalExpansionCoefficient: number = 2.5e-6
  ): number {
    const temperatureDifference = currentTemperature - referenceTemperature;
    return Math.abs(temperatureDifference) * thermalExpansionCoefficient;
  }

  /**
   * Determines if thermal conditions are anomalous for deep earthquake occurrence
   * @param depth - Depth in kilometers
   * @param temperature - Measured temperature in Celsius
   * @param expectedTemperature - Expected temperature at depth in Celsius
   * @param anomalyThreshold - Threshold for considering conditions anomalous (default: 100°C)
   * @returns Boolean indicating if conditions are anomalous
   */
  static isThermallyAnomalous(
    depth: number,
    temperature: number,
    expectedTemperature: number,
    anomalyThreshold: number = 100
  ): boolean {
    const temperatureDifference = Math.abs(temperature - expectedTemperature);
    return temperatureDifference > anomalyThreshold;
  }

  /**
   * Calculates heat flux through geological layers
   * @param temperatureDifference - Temperature difference across layer in Celsius
   * @param thickness - Thickness of layer in meters
   * @param thermalConductivity - Thermal conductivity of material in W/(m·K)
   * @returns Heat flux in W/m²
   */
  static calculateHeatFlux(
    temperatureDifference: number,
    thickness: number,
    thermalConductivity: number
  ): number {
    return (thermalConductivity * temperatureDifference) / thickness;
  }

  /**
   * Estimates the thermal energy released during rupture
   * @param mass - Mass of ruptured material in kg
   * @param specificHeat - Specific heat capacity in J/(kg·K)
   * @param temperatureChange - Change in temperature in Kelvin
   * @returns Thermal energy in Joules
   */
  static calculateThermalEnergy(
    mass: number,
    specificHeat: number,
    temperatureChange: number
  ): number {
    return mass * specificHeat * temperatureChange;
  }
}