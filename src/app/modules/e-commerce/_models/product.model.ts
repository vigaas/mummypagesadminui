import { BaseModel } from '../../../_mummypage/shared/crud-table';

export interface Product extends BaseModel {
  id: number;
  model: string;
  manufacture: string;
  modelYear: number;
  mileage: number;
  description: string;
  color: string;
  price: number;
  condition: number;
  status: number;
  VINCode: string;
}
