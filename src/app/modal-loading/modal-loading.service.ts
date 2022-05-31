import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalLoadingService {
  message = '';
  show$ = new ReplaySubject(1);
  hide$ = new ReplaySubject(1);

  constructor() {}

  show(message?: string) {
    this.message = message ? message : '';
    this.show$.next();
  }

  hide() {
    this.hide$.next();
  }
}
