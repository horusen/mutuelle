import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MutuelleService {
  single: any;
  constructor() {}

  getMututelle(index: number) {
    let unparsedData = localStorage.getItem('mutuelles');
    this.single = unparsedData ? JSON.parse(unparsedData)[index] : null;
  }
}
