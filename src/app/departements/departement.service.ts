import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { Departement } from './departement.model';
import { tap, map } from 'rxjs/operators';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class DepartementService extends BaseService<Departement> {
  mock = [
    {
      id: 1,
      region: 1,
      libelle: 'Guédiawaye',
    },
    {
      id: 2,
      region: 1,
      libelle: 'Pikine',
    },
    {
      id: 3,
      region: 1,
      libelle: 'Rufisque',
    },
    {
      id: 4,
      region: 2,
      libelle: 'BAMBEY',
    },
    {
      id: 5,
      region: 2,
      libelle: 'DIOURBEL',
    },
    {
      id: 6,
      region: 2,
      libelle: 'MBACKE',
    },
    {
      id: 7,
      region: 3,
      libelle: 'FATICK',
    },
    {
      id: 8,
      region: 3,
      libelle: 'GOSSAS',
    },
    {
      id: 9,
      region: 4,
      libelle: 'BIRKILANE',
    },
    {
      id: 10,
      region: 4,
      libelle: 'KAFFRINE',
    },
    {
      id: 11,
      region: 4,
      libelle: 'MALEM HODDAR',
    },
    {
      id: 12,
      region: 5,
      libelle: 'GUINGUINEO',
    },
    {
      id: 13,
      region: 5,
      libelle: 'KAOLACK',
    },
    {
      id: 14,
      region: 6,
      libelle: 'KEDOUGOU',
    },
    {
      id: 15,
      region: 6,
      libelle: 'SALEMATA',
    },
    {
      id: 16,
      region: 6,
      libelle: 'NSARAYA',
    },
    {
      id: 17,
      region: 7,
      libelle: 'KOLDA',
    },
    {
      id: 18,
      region: 7,
      libelle: 'MEDINA YORO FOULAH',
    },
    {
      id: 19,
      region: 7,
      libelle: 'VELINGARA',
    },
    {
      id: 20,
      region: 8,
      libelle: 'KEBEMER',
    },
    {
      id: 21,
      region: 8,
      libelle: 'LINGUERE',
    },
    {
      id: 22,
      region: 8,
      libelle: 'LOUGA',
    },
  ];
  constructor() {
    super('departements');
  }

  getByRegion(region: number) {
    return this.factory
      .get(`regions/${region}/departements`)
      .pipe(map((response: any) => response.data))
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  // getByRegion(region: number) {
  //   this.data = this.mock.filter((item) => item.region == region);
  // }
}
