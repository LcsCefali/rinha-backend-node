export interface IRawQuery<Output = any> {
  result: Output,
  rowCount: number;
}