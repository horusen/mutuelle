import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecapitulatifService {
  recap: any;
  constructor() {}

  setRecap(recap: any) {
    this.recap = recap;
    console.log(recap);
  }
}
