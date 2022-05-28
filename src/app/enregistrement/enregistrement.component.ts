import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BaseCreateComponent } from 'src/shared/base-component/base-create.component';
import { BaseService } from 'src/shared/services/base.service';
import { TypeMutuellesService } from 'src/app/type-mutuelles/type-mutuelles.service';
import { RegionService } from 'src/app/regions/region.service';
import { DepartementService } from 'src/app/departements/departement.service';
import { CommuneService } from 'src/app/communes/commune.service';
import { MutuellesService } from 'src/app/mutuelles.service';

@Component({
  selector: '',
  template: '',
  styles: [],
})
export abstract class EnregistrementComponent
  extends BaseCreateComponent
  implements OnInit
{
  active = 'structure';
  model!: NgbDateStruct;

  dependancies: { [k: string]: any[] } = {
    regions: [],
    departements: [],
    communes: [],
    types: [],
    mutuelles: [],
  };

  dependanciesLoading: { [k: string]: boolean } = {
    regions: false,
    departements: false,
    communes: false,
    types: false,
    mutuelles: false,
  };

  constructor(
    public baseService: BaseService,
    public typeService: TypeMutuellesService,
    public regionService: RegionService,
    public departementService: DepartementService,
    public communeService: CommuneService,
    public mutuelleService: MutuellesService
  ) {
    super(baseService);
  }

  ngOnInit(): void {}

  changeNav(nav: any) {
    this.active = nav;
  }

  abstract initialiseForm(): void;

  getRegions() {
    if (!this.dependancies.regions.length) {
      this.dependanciesLoading.regions = true;
      this.regionService.get({ emitData: false }).subscribe((data) => {
        this.dependancies.regions = data;
        this.dependanciesLoading.regions = false;
      });
    }
  }

  getTypes() {
    if (!this.dependancies.types.length) {
      this.dependanciesLoading.types = true;
      this.typeService.get({ emitData: false }).subscribe((data) => {
        this.dependancies.types = data;
        this.dependanciesLoading.types = false;
      });
    }
  }

  getDepartementsByRegion(region: number) {
    this.dependanciesLoading.departements = true;
    this.departementService.getByRegion(region).subscribe((data) => {
      this.dependancies.departements = data;
      this.dependanciesLoading.departements = false;
    });
  }

  getCommunesByDepartement(departement: number) {
    this.dependanciesLoading.communes = true;
    this.communeService.getByDepartement(departement).subscribe((data) => {
      this.dependancies.communes = data;
      this.dependanciesLoading.communes = false;
    });
  }

  getMutuellesByCommuneAndByType(commune: number, type: number) {
    this.dependanciesLoading.mutuelles = true;
    this.mutuelleService
      .getByCommuneAndByType(commune, type)
      .subscribe((data) => {
        this.dependancies.mutuelles = data;
        this.dependanciesLoading.mutuelles = false;
      });
  }

  calculateTotalHomme() {
    let total =
      this.form.get('cas_classique.nombre_h')?.value +
      this.form.get('cas_bsf.nombre_h')?.value +
      this.form.get('cas_cec.nombre_h')?.value +
      this.form.get('cas_eleve.nombre_h')?.value +
      this.form.get('cas_ndongo_daara.nombre_h')?.value;

    this.form.get('total.nombre_h')?.setValue(total);
  }

  calculateTotalFemme() {
    let total =
      this.form.get('cas_classique.nombre_f')?.value +
      this.form.get('cas_bsf.nombre_f')?.value +
      this.form.get('cas_cec.nombre_f')?.value +
      this.form.get('cas_eleve.nombre_f')?.value +
      this.form.get('cas_ndongo_daara.nombre_f')?.value;

    this.form.get('total.nombre_f')?.setValue(total);
  }

  calculateTotal() {
    let total =
      this.form.get('total.nombre_h')?.value +
      this.form.get('total.nombre_f')?.value;
    this.form.get('total.total')?.setValue(total);
  }

  calculateTotalCoutHomme() {
    let total =
      this.form.get('cas_classique.cout_h')?.value +
      this.form.get('cas_bsf.cout_h')?.value +
      this.form.get('cas_cec.cout_h')?.value +
      this.form.get('cas_eleve.cout_h')?.value +
      this.form.get('cas_ndongo_daara.cout_h')?.value;

    this.form.get('total.cout_h')?.setValue(total);
  }

  calculateTotalCoutFemme() {
    let total =
      this.form.get('cas_classique.cout_f')?.value +
      this.form.get('cas_bsf.cout_f')?.value +
      this.form.get('cas_cec.cout_f')?.value +
      this.form.get('cas_eleve.cout_f')?.value +
      this.form.get('cas_ndongo_daara.cout_f')?.value;

    this.form.get('total.cout_f')?.setValue(total);
  }

  calculateTotalCout() {
    let total =
      this.form.get('total.cout_h')?.value +
      this.form.get('total.cout_f')?.value;
    this.form.get('total.total_cout')?.setValue(total);
  }

  totaux() {
    this.calculateTotalHomme();
    this.calculateTotalFemme();
    this.calculateTotalCoutHomme();
    this.calculateTotalCoutFemme();
    this.calculateTotal();
    this.calculateTotalCout();
  }

  abstract create(): void;
}
