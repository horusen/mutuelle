import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { EnregistrementBeneficiaire } from './enregistrement-beneficiaires.model';
import { Mutuelle } from './../mutuelles/mutuelles.model';
import { Commune } from './../communes/commune.model';
import { Departement } from './../departements/departement.model';
import { Region } from './../regions/region.model';
import { ApiResponse } from './../../shared/models/ApiResponse';
import { Params } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { TypeMutuelle } from './../type-mutuelles/type-mutuelles.model';

@Injectable({
  providedIn: 'root',
})
export class EnregistrementBeneficiairesService extends BaseService<EnregistrementBeneficiaire> {
  constructor() {
    super('enregistrement-beneficiaires');
  }

  private transformData(enregistrement: EnregistrementBeneficiaire) {
    let mutuelle = enregistrement.mutuelle as Mutuelle;
    let commune = mutuelle.commune as Commune;
    let departement = commune.departement as Departement;
    let region = departement.region as Region;
    let type = mutuelle.type as TypeMutuelle;

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
        tap((response: ApiResponse<EnregistrementBeneficiaire>) => {
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

  prepareDataForCsvExporting() {
    return this.data.map((enregistrement) => ({
      region: enregistrement.region?.libelle,
      departement: enregistrement.departement?.libelle,
      commune: enregistrement.commune?.libelle,
      mutuelle: (enregistrement.mutuelle as Mutuelle).libelle,
      type_mutuelle: enregistrement.type?.libelle,
      date: enregistrement.date?.toString().split('T')[0],
      nombre_adherent: enregistrement.nombre_adherent,
      nombre_beneficiaire: enregistrement.nombre_beneficiaire,
      nombre_beneficiaire_a_jour: enregistrement.nombre_beneficiaire_a_jour,
      dette_etat: enregistrement.dette_etat,
    }));
  }
}
