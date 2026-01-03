typescript
export interface SeismicParameters {
  depthRange: [number, number];
  temperatureThreshold: number;
  pressureFactor: number;
  rockComposition: string[];
}

export interface AppConfig {
  seismicParameters: SeismicParameters;
  analysisTimeout: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableRealTimeMonitoring: boolean;
}

export const appConfig: AppConfig = {
  seismicParameters: {
    depthRange: [30, 70],
    temperatureThreshold: 800,
    pressureFactor: 1.5,
    rockComposition: ['basalt', 'andesite']
  },
  analysisTimeout: 30000,
  logLevel: 'info',
  enableRealTimeMonitoring: false
};