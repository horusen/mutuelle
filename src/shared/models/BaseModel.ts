import { User } from 'src/app/users/users.model';

export interface BaseModel {
  id?: number;
  inscription?: number | User;
  created_at?: Date;
  update_at?: Date;
  deleted_at?: Date;
}
