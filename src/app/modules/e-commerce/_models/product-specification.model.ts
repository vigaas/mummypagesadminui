import { BaseModel } from '../../../_mummypage/shared/crud-table';

export interface ProductSpecification extends BaseModel {
  id: number;
  carId: number;
  specId: number;
  specName: string;
  value: string;
}
