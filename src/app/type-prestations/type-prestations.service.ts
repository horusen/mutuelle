import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { TypePrestation } from './type-prestations.model';

@Injectable({
  providedIn: 'root',
})
export class TypePrestationsService extends BaseService<TypePrestation> {
  constructor() {
    super('type-prestations');
  }
}
