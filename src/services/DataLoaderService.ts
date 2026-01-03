typescript
export class DataLoaderService {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async loadGeologicalData(depthRange: [number, number]): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/geological-data?depthMin=${depthRange[0]}&depthMax=${depthRange[1]}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to load geological data:', error);
      throw error;
    }
  }

  async loadSeismicEvents(startDate: string, endDate: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/seismic-events?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to load seismic events:', error);
      throw error;
    }
  }

  async loadRockCompositionData(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/rock-composition`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to load rock composition data:', error);
      throw error;
    }
  }
}