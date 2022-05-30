import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { EnregistrementCout } from './enregistrement-couts.model';
import { Params } from '@angular/router';
import { ApiResponse } from 'src/shared/models/ApiResponse';
import { Mutuelle } from '../mutuelles/mutuelles.model';
import { Commune } from './../communes/commune.model';
import { Departement } from './../departements/departement.model';
import { Region } from 'src/app/regions/region.model';
import { tap, map } from 'rxjs/operators';
import { TypeMutuelle } from './../type-mutuelles/type-mutuelles.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnregistrementCoutsService extends BaseService<EnregistrementCout> {
  showModal$ = new Subject();
  constructor() {
    super('enregistrement-couts');
  }

  private transformData(enregistrement: EnregistrementCout) {
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
        tap((response: ApiResponse<EnregistrementCout>) => {
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
      type_mutuelle: (enregistrement.type as TypeMutuelle)?.libelle,
      date: enregistrement.date?.toString().split('T')[0],
      cas_classique_h: enregistrement.cas_classique_nombre_h,
      cas_classique_f: enregistrement.cas_classique_nombre_f,
      cas_classique_total:
        enregistrement.cas_classique_nombre_h +
        enregistrement.cas_classique_nombre_f,
      cas_classique_cout_h: enregistrement.cas_classique_cout_h,
      cas_classique_cout_f: enregistrement.cas_classique_cout_f,
      cas_classique_cout_total:
        enregistrement.cas_classique_cout_h +
        enregistrement.cas_classique_cout_f,
      cas_bsf_h: enregistrement.cas_bsf_nombre_h,
      cas_bsf_f: enregistrement.cas_bsf_nombre_f,
      cas_bsf_total:
        enregistrement.cas_bsf_nombre_h + enregistrement.cas_bsf_nombre_f,
      cas_bsf_cout_h: enregistrement.cas_bsf_cout_h,
      cas_bsf_cout_f: enregistrement.cas_bsf_cout_f,
      cas_bsf_cout_total:
        enregistrement.cas_bsf_cout_h + enregistrement.cas_bsf_cout_f,
      cas_cec_h: enregistrement.cas_cec_nombre_h,
      cas_cec_f: enregistrement.cas_cec_nombre_f,
      cas_cec_total:
        enregistrement.cas_cec_nombre_h + enregistrement.cas_cec_nombre_f,
      cas_cec_cout_h: enregistrement.cas_cec_cout_h,
      cas_cec_cout_f: enregistrement.cas_cec_cout_f,
      cas_cec_cout_total:
        enregistrement.cas_cec_cout_h + enregistrement.cas_cec_cout_f,
      cas_eleve_h: enregistrement.cas_eleve_nombre_h,
      cas_eleve_f: enregistrement.cas_eleve_nombre_f,
      cas_eleve_total:
        enregistrement.cas_eleve_nombre_h + enregistrement.cas_eleve_nombre_f,
      cas_eleve_cout_h: enregistrement.cas_eleve_cout_h,
      cas_eleve_cout_f: enregistrement.cas_eleve_cout_f,
      cas_eleve_cout_total:
        enregistrement.cas_eleve_cout_h + enregistrement.cas_eleve_cout_f,
      cas_ndongo_daara_h: enregistrement.cas_ndongo_daara_nombre_h,
      cas_ndongo_daara_f: enregistrement.cas_ndongo_daara_nombre_f,
      cas_ndongo_daara_total:
        enregistrement.cas_ndongo_daara_nombre_h +
        enregistrement.cas_ndongo_daara_nombre_f,
      cas_ndongo_daara_cout_h: enregistrement.cas_ndongo_daara_cout_h,
      cas_ndongo_daara_cout_f: enregistrement.cas_ndongo_daara_cout_f,
      cas_ndongo_daara_cout_total:
        enregistrement.cas_ndongo_daara_cout_h +
        enregistrement.cas_ndongo_daara_cout_f,
      cas_total_h:
        enregistrement.cas_classique_nombre_h +
        enregistrement.cas_bsf_nombre_h +
        enregistrement.cas_cec_nombre_h +
        enregistrement.cas_eleve_nombre_h +
        enregistrement.cas_ndongo_daara_nombre_h,
      cas_total_f:
        enregistrement.cas_classique_nombre_f +
        enregistrement.cas_bsf_nombre_f +
        enregistrement.cas_cec_nombre_f +
        enregistrement.cas_eleve_nombre_f +
        enregistrement.cas_ndongo_daara_nombre_f,
      cas_total:
        enregistrement.cas_classique_nombre_h +
        enregistrement.cas_bsf_nombre_h +
        enregistrement.cas_cec_nombre_h +
        enregistrement.cas_eleve_nombre_h +
        enregistrement.cas_ndongo_daara_nombre_h +
        enregistrement.cas_classique_nombre_f +
        enregistrement.cas_bsf_nombre_f +
        enregistrement.cas_cec_nombre_f +
        enregistrement.cas_eleve_nombre_f +
        enregistrement.cas_ndongo_daara_nombre_f,
      cas_total_cout_h:
        enregistrement.cas_classique_cout_h +
        enregistrement.cas_bsf_cout_h +
        enregistrement.cas_cec_cout_h +
        enregistrement.cas_eleve_cout_h +
        enregistrement.cas_ndongo_daara_cout_h,
      cas_total_cout_f:
        enregistrement.cas_classique_cout_f +
        enregistrement.cas_bsf_cout_f +
        enregistrement.cas_cec_cout_f +
        enregistrement.cas_eleve_cout_f +
        enregistrement.cas_ndongo_daara_cout_f,
      cas_total_cout:
        enregistrement.cas_classique_cout_h +
        enregistrement.cas_bsf_cout_h +
        enregistrement.cas_cec_cout_h +
        enregistrement.cas_eleve_cout_h +
        enregistrement.cas_ndongo_daara_cout_h +
        enregistrement.cas_classique_cout_f +
        enregistrement.cas_bsf_cout_f +
        enregistrement.cas_cec_cout_f +
        enregistrement.cas_eleve_cout_f +
        enregistrement.cas_ndongo_daara_cout_f,
    }));
  }
}
