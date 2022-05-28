import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { EnregistrementBeneficiaire } from './enregistrement-beneficiaires.model';

@Injectable({
  providedIn: 'root',
})
export class EnregistrementBeneficiairesService extends BaseService<EnregistrementBeneficiaire> {
  constructor() {
    super('enregistrement-beneficiaires');
  }
}
