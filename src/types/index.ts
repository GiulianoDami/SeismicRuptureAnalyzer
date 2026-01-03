export interface GeologicalParameters {
  depthRange: [number, number];
  temperatureThreshold: number;
  pressureFactor: number;
  rockComposition: string[];
}

export interface SeismicEvent {
  magnitude: number;
  depth: number;
  duration: number;
  faultOrientation: string;
  thermalGradient: number;
}

export interface RuptureAnalysisResult {
  isAnomalous: boolean;
  confidenceScore: number;
  keyIndicators: string[];
  predictedMagnitude?: number;
  ruptureVelocity?: number;
}