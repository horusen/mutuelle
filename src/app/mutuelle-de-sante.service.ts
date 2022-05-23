import { Injectable } from '@angular/core';
import { MutuelleDeSante } from './mutuelle-de-sante.model';

@Injectable({
  providedIn: 'root',
})
export class MutuelleDeSanteService {
  data: MutuelleDeSante[] = [];
  mockup = [
    {
      id: 1,
      commune: 1,
      libelle: 'MS Médina Gouna',
    },
    {
      id: 2,
      commune: 2,
      libelle: 'MUSABIT',
    },
    {
      id: 3,
      commune: 2,
      libelle: 'MS Khady Mar ND',
    },
    {
      id: 4,
      commune: 3,
      libelle: 'Aar Njabot ji',
    },
    {
      id: 5,
      commune: 3,
      libelle: 'Jappo Faju',
    },
    {
      id: 6,
      commune: 4,
      libelle: 'Wer Werle',
    },
    {
      id: 7,
      commune: 4,
      libelle: 'MS And Fagaru',
    },
    {
      id: 8,
      commune: 4,
      libelle: 'Kaay Faju',
    },
    {
      id: 9,
      commune: 5,
      libelle: 'And Faju',
    },
    {
      id: 10,
      commune: 5,
      libelle: 'Serigne Bassirou Bara',
    },
    {
      id: 11,
      commune: 6,
      libelle: 'DALIFORT',
    },
  ];
  constructor() {}

  getByCommune(commune: number) {
    this.data = this.mockup.filter((item) => item.commune == commune);
  }
}
