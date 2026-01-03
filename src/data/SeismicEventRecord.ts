typescript
export interface SeismicEventRecord {
  id: string;
  magnitude: number;
  depth: number; // in kilometers
  duration: number; // in seconds
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  faultOrientation: string; // e.g., 'north-south', 'east-west'
  thermalGradient: number; // Celsius per kilometer
  pressureConditions: {
    pressure: number; // in MPa
    stressState: 'compressive' | 'tensile' | 'shear';
  };
  rockComposition: string[]; // e.g., ['basalt', 'andesite']
  ruptureVelocity: number; // in km/s
  isAnomalous?: boolean;
  analysisNotes?: string;
}