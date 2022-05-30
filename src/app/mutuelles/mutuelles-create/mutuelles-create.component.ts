import { Component, OnInit } from '@angular/core';
import { MutuelleService } from 'src/app/mutuelle.service';
import { BaseCreateComponent } from './../../../shared/base-component/base-create.component';
import { Mutuelle } from './../mutuelles.model';
import { MutuellesService } from './../../mutuelles.service';
import { Validators } from '@angular/forms';
import { DepartementService } from 'src/app/departements/departement.service';
import { RegionService } from 'src/app/regions/region.service';
import { CommuneService } from 'src/app/communes/commune.service';
import { TypeMutuellesService } from 'src/app/type-mutuelles/type-mutuelles.service';
import { Commune } from 'src/app/communes/commune.model';
import { TypeMutuelle } from './../../type-mutuelles/type-mutuelles.model';

@Component({
  selector: 'app-mutuelles-create',
  templateUrl: './mutuelles-create.component.html',
  styleUrls: ['./mutuelles-create.component.scss'],
})
export class MutuellesCreateComponent
  extends BaseCreateComponent<Mutuelle>
  implements OnInit
{
  dependancies: { [k: string]: any[] } = {
    regions: [],
    departements: [],
    communes: [],
    types: [],
  };

  dependanciesLoading = {
    regions: false,
    departements: false,
    communes: false,
    types: false,
  };
  constructor(
    public mutuelleService: MutuellesService,
    public departementService: DepartementService,
    public regionService: RegionService,
    public communeService: CommuneService,
    public typeService: TypeMutuellesService
  ) {
    super(mutuelleService);
  }

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

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(mutuelle?: Mutuelle): void {
    this.form = this.fb.group({
      libelle: [mutuelle ? mutuelle.libelle : null, Validators.required],
      region: [mutuelle ? [mutuelle.region] : null, Validators.required],
      departement: [
        mutuelle ? [mutuelle.departement] : null,
        Validators.required,
      ],
      commune: [mutuelle ? [mutuelle.commune] : null, Validators.required],
      type: [mutuelle ? [mutuelle.type] : null, Validators.required],
    });

    this.form.get('region')!.valueChanges.subscribe((value) => {
      this.form.get('departement')!.setValue(null);
      if (value != null) {
        this.getDepartementsByRegion(value[0].id);
      }
    });

    this.form.get('departement')!.valueChanges.subscribe((value) => {
      this.form.get('commune')!.setValue(null);
      if (value != null) {
        this.getCommunesByDepartement(value[0].id);
      }
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      this.mutuelleService
        .store({
          ...this.form.value,
          commune: this.formValue('commune')[0].id,
          type: this.formValue('type')[0].id,
        })
        .subscribe(() => {
          this.loading = false;
          this.helper.notification.alertSuccess();
          this.form.reset();
        });
    } else {
      this.helper.notification.alertDanger('Formulaire invalide');
    }
  }
}
