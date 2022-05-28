import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { Region } from './region.model';

@Injectable({
  providedIn: 'root',
})
export class RegionService extends BaseService<Region> {
  mockup = [
    {
      id: 1,
      libelle: 'Dakar',
    },
    {
      id: 2,
      libelle: 'Diourbel',
    },
    {
      id: 3,
      libelle: 'Fatick',
    },
    {
      id: 4,
      libelle: 'Kaffrine',
    },
    {
      id: 5,
      libelle: 'Kaolack',
    },
    {
      id: 6,
      libelle: 'Kedougou',
    },
    {
      id: 7,
      libelle: 'Kolda',
    },
    {
      id: 8,
      libelle: 'Louga',
    },
    {
      id: 9,
      libelle: 'Matam',
    },
    {
      id: 10,
      libelle: 'Saint-louis',
    },
    {
      id: 11,
      libelle: 'Sedhiou',
    },
    {
      id: 12,
      libelle: 'Tambacounda',
    },
    {
      id: 13,
      libelle: 'Thiès',
    },
    {
      id: 14,
      libelle: 'Ziguinchor',
    },
  ];

  constructor() {
    super('regions');
  }

  getData() {
    this.data = this.mockup;
  }
}
