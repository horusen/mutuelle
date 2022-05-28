import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService<User> {
  constructor() {
    super('users');
  }
}
