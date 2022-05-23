import { Injectable } from '@angular/core';
import { TypeDeMutuelle } from './type-de-mutuelle.model';

@Injectable({
  providedIn: 'root',
})
export class TypeDeMutuelleService {
  data: TypeDeMutuelle[] = [];
  mockup = [
    {
      id: 1,
      libelle: 'Poste de santé',
    },
    {
      id: 2,
      libelle: 'Centre de santé',
    },
    {
      id: 3,
      libelle: 'Structure privée',
    },
    {
      id: 4,
      libelle: 'Officines privée',
    },
  ];
  constructor() {}

  getData() {
    this.data = this.mockup;
  }
}
