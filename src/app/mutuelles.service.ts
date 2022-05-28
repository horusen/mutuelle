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
          this.data = response.data.map((mutuelle: any) => {
            return {
              ...mutuelle,
              departement: (mutuelle.commune as Commune).departement,
              region: (
                (mutuelle.commune as Commune)
                  .departement as unknown as Departement
              ).region,
            };
          });
        }),
        map((response) => response.data)
      );
  }

  getByCommuneAndByType(commune: number, type: number) {
    return this.factory.get(`communes/${commune}/types/${type}/mutuelles`).pipe(
      tap(this.onlyErrorResponseHandler),
      map((response) => response.data)
    );
  }
}
