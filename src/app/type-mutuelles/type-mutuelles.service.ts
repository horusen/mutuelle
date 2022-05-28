import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { TypeMutuelle } from './type-mutuelles.model';

@Injectable({
  providedIn: 'root',
})
export class TypeMutuellesService extends BaseService<TypeMutuelle> {
  constructor() {
    super('type-mutuelles');
  }
}
