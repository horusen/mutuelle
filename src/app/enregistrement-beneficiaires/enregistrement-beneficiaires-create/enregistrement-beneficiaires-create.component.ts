import { Component, OnInit } from '@angular/core';
import { CommuneService } from 'src/app/communes/commune.service';
import { DepartementService } from 'src/app/departements/departement.service';
import { EnregistrementComponent } from 'src/app/enregistrement/enregistrement.component';
import { RegionService } from 'src/app/regions/region.service';
import { EnregistrementBeneficiairesService } from '../enregistrement-beneficiaires.service';
import { TypeMutuellesService } from 'src/app/type-mutuelles/type-mutuelles.service';
import { MutuellesService } from 'src/app/mutuelles.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-enregistrement-beneficiaires-create',
  templateUrl: './enregistrement-beneficiaires-create.component.html',
  styleUrls: ['./enregistrement-beneficiaires-create.component.scss'],
})
export class EnregistrementBeneficiairesCreateComponent
  extends EnregistrementComponent
  implements OnInit
{
  constructor(
    public enregistrementService: EnregistrementBeneficiairesService,
    public regionService: RegionService,
    public departementService: DepartementService,
    public communeService: CommuneService,
    public mutuelleService: MutuellesService,
    public typeMutuelleService: TypeMutuellesService
  ) {
    super(
      enregistrementService,
      typeMutuelleService,
      regionService,
      departementService,
      communeService,
      mutuelleService
    );
  }

  ngOnInit(): void {}

  initialiseForm(enregistrement?: any) {
    let date = new Date();
    if (enregistrement) date = new Date(enregistrement.date);

    this.form = this.fb.group({
      structure: this.fb.group({
        region: [
          enregistrement ? [enregistrement.region] : null,
          Validators.required,
        ],
        departement: [
          enregistrement ? [enregistrement.departement] : null,
          Validators.required,
        ],
        commune: [
          enregistrement ? [enregistrement.commune] : null,
          Validators.required,
        ],
        mutuelle_de_sante: [
          enregistrement ? [enregistrement.mutuelle] : null,
          Validators.required,
        ],
        type: [
          enregistrement ? [enregistrement.type] : null,
          Validators.required,
        ],
        date: [
          enregistrement
            ? {
                year: date?.getFullYear(),
                month: date?.getMonth(),
                day: date?.getDay(),
              }
            : null,
          Validators.required,
        ],
      }),

      beneficiaire: this.fb.group({
        nombre_adhrerent: [
          enregistrement ? enregistrement.nombre_adhrerent : 0,
        ],
        nombre_beneficiaire: [
          enregistrement ? enregistrement.nombre_beneficiaire : 0,
        ],
        nombre_beneficiaire_a_jour: [
          enregistrement ? enregistrement.nombre_beneficiaire_a_jour : 0,
        ],
        dette_etat: [enregistrement ? enregistrement.dette_etat : 0],
      }),
    });

    this.form.get('structure.region')!.valueChanges.subscribe((value) => {
      this.form.get('structure.departement')!.setValue(null);
      if (value != null) {
        this.getDepartementsByRegion(value[0].id);
      }
    });

    this.form.get('structure.departement')!.valueChanges.subscribe((value) => {
      this.form.get('structure.commune')!.setValue(null);
      if (value != null) {
        this.getCommunesByDepartement(value[0].id);
      }
    });

    this.form.get('structure.commune')!.valueChanges.subscribe((value) => {
      let commune = value?.at(0);
      let typeMutuelle = this.formValue('structure.type')?.at(0) || null;

      this.form.get('structure.mutuelle_de_sante')!.setValue(null);

      if (commune && typeMutuelle) {
        this.getMutuellesByCommuneAndByType(commune.id, typeMutuelle.id);
      }
    });

    this.form.get('structure.type')!.valueChanges.subscribe((value) => {
      this.form.get('structure.mutuelle_de_sante')!.setValue(null);

      let typeMutuelle = value?.at(0);
      let commune = this.formValue('structure.commune')?.at(0);

      if (typeMutuelle && commune) {
        this.getMutuellesByCommuneAndByType(commune.id, typeMutuelle.id);
      }
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const { structure, beneficiaire } = this.form.value;

      const data = {
        ...beneficiaire,
        date: this.fromDpDateToString(structure.date),
        mutuelle: structure.mutuelle_de_sante[0].id,
      };

      this.enregistrementService.store(data).subscribe(() => {
        this.loading = false;
        this.helper.notification.alertSuccess();
        this.form.reset();
      });
    } else {
      this.helper.notification.toastDanger('Formulaire invalide');
    }
  }
}
