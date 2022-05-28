import { BaseModel } from './../../shared/models/BaseModel';

export interface User extends BaseModel {
  name: string;
  email: string;
}
