typescript
export interface DeepFocusEarthquake {
  id: string;
  magnitude: number;
  depth: number; // in kilometers
  duration: number; // in seconds
  location: {
    latitude: number;
    longitude: number;
  };
  faultOrientation: string;
  thermalGradient: number; // degrees per km
  pressureConditions: {
    pressure: number; // in MPa
    stressField: string;
  };
  ruptureVelocity: number; // in km/s
  rockComposition: string[];
  anomalyScore: number;
  timestamp: Date;
}