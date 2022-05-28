import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { Commune } from './commune.model';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommuneService extends BaseService<Commune> {
  mockup = [
    {
      id: 1,
      departement: 1,
      libelle: 'MEDINA GOUNASS',
    },
    {
      id: 1,
      departement: 1,
      libelle: 'NDIAREME LIMAMOULAYE',
    },
    {
      id: 1,
      departement: 1,
      libelle: 'WAKHINANE NIMZATT',
    },
    {
      id: 1,
      departement: 1,
      libelle: 'GOLF SUD',
    },
    {
      id: 1,
      departement: 1,
      libelle: 'SAM NOTAIRE',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'DALIFORT',
    },
    {
      id: 1,
      departement: 2,
      libelle: ' DIAKSAO',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'DIAMAGUENE SICAP MBAO',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'DJIDA THIAROYE KAO',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'GUINAW RAIL NORD',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'GUINAW RAIL SUD',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'KEUR MASSAR',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'MALIKA',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'MBAO',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'Pikine EST',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'Pikine NORD',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'Pikine OUEST',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'THIAROYE GARE',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'THIAROYE SUR MER',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'YEUMBEUL NORD',
    },
    {
      id: 1,
      departement: 2,
      libelle: 'YEUMBEUL SUD',
    },
    {
      id: 1,
      departement: 2,
      libelle: '',
    },
    {
      id: 1,
      departement: 1,
      libelle: '',
    },
    {
      id: 1,
      departement: 1,
      libelle: '',
    },
    {
      id: 1,
      departement: 1,
      libelle: '',
    },
    {
      id: 1,
      departement: 1,
      libelle: '',
    },
    {
      id: 1,
      departement: 1,
      libelle: '',
    },
    {
      id: 1,
      departement: 1,
      libelle: '',
    },
    {
      id: 1,
      departement: 1,
      libelle: '',
    },
  ];
  constructor() {
    super('communes');
  }

  getByDepartement(departement: number) {
    return this.factory
      .get(`departements/${departement}/communes`)
      .pipe(map((response: any) => response.data))
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
