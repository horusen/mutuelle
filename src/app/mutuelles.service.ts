import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ApiResponse } from 'src/shared/models/ApiResponse';
import { BaseService } from 'src/shared/services/base.service';
import { Mutuelle } from './mutuelles/mutuelles.model';
import { tap, map } from 'rxjs/operators';
import { Commune } from './communes/commune.model';
import { Departement } from './departements/departement.model';
import { Region } from './regions/region.model';

@Injectable({
  providedIn: 'root',
})
export class MutuellesService extends BaseService<Mutuelle> {
  constructor() {
    super('mutuelles');
  }

  get(options: { emitData: boolean; params?: Params } = { emitData: true }) {
    return this.factory
      .get(`${this.endPoint}`, { params: options?.params })
      .pipe(
        tap((response: ApiResponse<Mutuelle>) => {
          this.data = response.data.map((mutuelle: any) =>
            this.transformData(mutuelle)
          );
        }),
        map((response) => response.data)
      );
  }

  store(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = this.transformData(response);
          this.unshiftItemInData(this.transformData(response));
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  update(id: number, data: {}) {
    return this.factory.put(`${this.endPoint}/${id}`, data).pipe(
      tap({
        next: (response) => {
          this.updateItemInData(id, this.transformData(response));
          this.lastItemEdited$.next(this.transformData(response));

          if (this._singleData) {
            this.singleData = this.transformData(response);
          }
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  transformData(mutuelle: Mutuelle) {
    let commune = mutuelle.commune as Commune;
    let departement = commune.departement as Departement;
    let region = departement.region as Region;
    let type = mutuelle.type;

    return {
      ...mutuelle,
      commune,
      departement,
      region,
      type,
    };
  }

  getByCommuneAndByType(commune: number, type: number) {
    return this.factory.get(`communes/${commune}/types/${type}/mutuelles`).pipe(
      tap(this.onlyErrorResponseHandler),
      map((response) => response.data)
    );
  }
}
