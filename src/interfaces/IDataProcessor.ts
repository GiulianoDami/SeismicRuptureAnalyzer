typescript
export interface IDataProcessor {
  process(rawData: any): Promise<any>;
  validate(data: any): boolean;
  transform(data: any): any;
}