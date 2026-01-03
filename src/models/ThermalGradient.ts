typescript
export interface ThermalGradientData {
  depth: number;
  temperature: number;
  gradient: number;
}

export class ThermalGradient {
  private readonly depth: number;
  private readonly temperature: number;
  private readonly gradient: number;

  constructor(data: ThermalGradientData) {
    this.depth = data.depth;
    this.temperature = data.temperature;
    this.gradient = data.gradient;
  }

  getDepth(): number {
    return this.depth;
  }

  getTemperature(): number {
    return this.temperature;
  }

  getGradient(): number {
    return this.gradient;
  }

  isExtreme(): boolean {
    return this.gradient > 50; // Threshold for extreme thermal gradients
  }

  getGradientClassification(): string {
    if (this.gradient < 10) return 'Low';
    if (this.gradient < 30) return 'Moderate';
    if (this.gradient < 50) return 'High';
    return 'Extreme';
  }

  static fromJSON(json: any): ThermalGradient {
    return new ThermalGradient({
      depth: json.depth,
      temperature: json.temperature,
      gradient: json.gradient
    });
  }

  toJSON(): ThermalGradientData {
    return {
      depth: this.depth,
      temperature: this.temperature,
      gradient: this.gradient
    };
  }
}