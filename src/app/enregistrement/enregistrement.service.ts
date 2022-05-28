import { Inject, Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { Commune } from '../communes/commune.model';
import { Departement } from '../departements/departement.model';
import { Mutuelle } from '../mutuelles/mutuelles.model';
import { Region } from '../regions/region.model';
import { Enregistrement } from './enregistrement.model';
import { Params } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { ApiResponse } from './../../shared/models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class EnregistrementService extends BaseService<Enregistrement> {
  constructor(@Inject('string') public endPoint: string) {
    super(endPoint);
  }

  private transformData(enregistrement: Enregistrement) {
    let mutuelle = enregistrement.mutuelle as Mutuelle;
    let commune = mutuelle.commune as Commune;
    let departement = commune.departement as Departement;
    let region = departement.region as Region;
    let type = mutuelle.type;

    return {
      ...enregistrement,
      mutuelle,
      commune,
      departement,
      region,
      type,
    };
  }

  get(options: { emitData: boolean; params?: Params } = { emitData: true }) {
    return this.factory
      .get(`${this.endPoint}`, { params: options?.params })
      .pipe(
        tap((response: ApiResponse<Enregistrement>) => {
          this.data = response.data.map((enregistrement: any) =>
            this.transformData(enregistrement)
          );
        }),
        map((response) => response.data)
      );
  }

  show(id: number, emitData = true) {
    return this.factory.get(`${this.endPoint}/${id}`).pipe(
      tap({
        next: (single) => {
          if (emitData) this.singleData = this.transformData(single);
        },
        error: (error) => this.errorResponseHandler(error),
      }),
      map((single) => this.transformData(single))
    );
  }
}