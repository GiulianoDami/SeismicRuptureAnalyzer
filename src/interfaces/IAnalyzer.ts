typescript
export interface IAnalyzer {
  analyzeRupturePattern(eventData: SeismicEvent): AnalysisResult;
  validateParameters(): boolean;
}

export interface SeismicEvent {
  magnitude: number;
  depth: number;
  duration: number;
  faultOrientation: string;
  thermalGradient: number;
}

export interface AnalysisResult {
  isAnomalous: boolean;
  confidenceScore: number;
  keyIndicators: string[];
  recommendations: string[];
}