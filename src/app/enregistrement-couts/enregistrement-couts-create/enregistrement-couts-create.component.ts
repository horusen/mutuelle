import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommuneService } from 'src/app/communes/commune.service';
import { DepartementService } from 'src/app/departements/departement.service';
import { RegionService } from 'src/app/regions/region.service';
import { TypeMutuellesService } from 'src/app/type-mutuelles/type-mutuelles.service';
import { BaseCreateComponent } from 'src/shared/base-component/base-create.component';
import { EnregistrementCoutsService } from '../enregistrement-couts.service';

import { MutuellesService } from './../../mutuelles.service';
import { Validators } from '@angular/forms';
import { EnregistrementComponent } from 'src/app/enregistrement/enregistrement.component';

@Component({
  selector: 'app-enregistrement-couts-create',
  templateUrl: './enregistrement-couts-create.component.html',
  styleUrls: ['./enregistrement-couts-create.component.scss'],
})
export class EnregistrementCoutsCreateComponent
  extends EnregistrementComponent
  implements OnInit
{
  constructor(
    public enregistrementService: EnregistrementCoutsService,
    public typeService: TypeMutuellesService,
    public regionService: RegionService,
    public departementService: DepartementService,
    public communeService: CommuneService,
    public mutuelleService: MutuellesService
  ) {
    super(
      enregistrementService,
      typeService,
      regionService,
      departementService,
      communeService,
      mutuelleService
    );
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

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
      cas_classique: this.fb.group({
        nombre_h: [enregistrement ? enregistrement.cas_classique_nombre_h : 0],
        nombre_f: [enregistrement ? enregistrement.cas_classique_nombre_f : 0],
        cout_h: [enregistrement ? enregistrement.cas_classique_cout_h : 0],
        cout_f: [enregistrement ? enregistrement.cas_classique_cout_f : 0],
        total: [
          enregistrement
            ? enregistrement.cas_classique_nombre_f +
              enregistrement.cas_classique_nombre_h
            : 0,
        ],
        total_cout: [
          enregistrement
            ? enregistrement.cas_classique_cout_f +
              enregistrement.cas_classique_cout_h
            : 0,
        ],
      }),
      cas_bsf: this.fb.group({
        nombre_h: [enregistrement ? enregistrement.cas_bsf_nombre_h : 0],
        nombre_f: [enregistrement ? enregistrement.cas_bsf_nombre_f : 0],
        cout_h: [enregistrement ? enregistrement.cas_bsf_cout_h : 0],
        cout_f: [enregistrement ? enregistrement.cas_bsf_cout_f : 0],
        total: [
          enregistrement
            ? enregistrement.cas_bsf_nombre_f + enregistrement.cas_bsf_nombre_h
            : 0,
        ],
        total_cout: [
          enregistrement
            ? enregistrement.cas_bsf_cout_f + enregistrement.cas_bsf_cout_h
            : 0,
        ],
      }),
      cas_cec: this.fb.group({
        nombre_h: [enregistrement ? enregistrement.cas_cec_nombre_h : 0],
        nombre_f: [enregistrement ? enregistrement.cas_cec_nombre_f : 0],
        cout_h: [enregistrement ? enregistrement.cas_cec_cout_h : 0],
        cout_f: [enregistrement ? enregistrement.cas_cec_cout_f : 0],
        total: [
          enregistrement
            ? enregistrement.cas_cec_nombre_f + enregistrement.cas_cec_nombre_h
            : 0,
        ],
        total_cout: [
          enregistrement
            ? enregistrement.cas_cec_cout_f + enregistrement.cas_cec_cout_h
            : 0,
        ],
      }),
      cas_eleve: this.fb.group({
        nombre_h: [enregistrement ? enregistrement.cas_eleve_nombre_h : 0],
        nombre_f: [enregistrement ? enregistrement.cas_eleve_nombre_f : 0],
        cout_h: [enregistrement ? enregistrement.cas_eleve_cout_h : 0],
        cout_f: [enregistrement ? enregistrement.cas_eleve_cout_f : 0],
        total: [
          enregistrement
            ? enregistrement.cas_eleve_nombre_f +
              enregistrement.cas_eleve_nombre_h
            : 0,
        ],
        total_cout: [
          enregistrement
            ? enregistrement.cas_eleve_cout_f + enregistrement.cas_eleve_cout_h
            : 0,
        ],
      }),
      cas_ndongo_daara: this.fb.group({
        nombre_h: [
          enregistrement ? enregistrement.cas_ndongo_daara_nombre_h : 0,
        ],
        nombre_f: [
          enregistrement ? enregistrement.cas_ndongo_daara_nombre_f : 0,
        ],
        cout_h: [enregistrement ? enregistrement.cas_ndongo_daara_cout_h : 0],
        cout_f: [enregistrement ? enregistrement.cas_ndongo_daara_cout_f : 0],
        total: [],
        total_cout: [
          enregistrement
            ? enregistrement.cas_ndongo_daara_cout_f +
              enregistrement.cas_ndongo_daara_cout_h
            : 0,
        ],
      }),
      total: this.fb.group({
        nombre_h: [0],
        nombre_f: [0],
        cout_h: [0],
        cout_f: [0],
        total: [0],
        total_cout: [0],
      }),
    });

    if (enregistrement) this.totaux();

    this.form.get('cas_classique')?.valueChanges.subscribe(() => {
      this.totaux();
    });
    this.form.get('cas_bsf')?.valueChanges.subscribe(() => {
      this.totaux();
    });
    this.form.get('cas_cec')?.valueChanges.subscribe(() => {
      this.totaux();
    });
    this.form.get('cas_eleve')?.valueChanges.subscribe(() => {
      this.totaux();
    });
    this.form.get('cas_ndongo_daara')?.valueChanges.subscribe(() => {
      this.totaux();
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

    this.form.get('cas_classique.nombre_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_classique.nombre_f')?.value != null) {
        this.form
          .get('cas_classique.total')
          ?.setValue(value + this.form.get('cas_classique.nombre_f')?.value);
      } else {
        this.form.get('cas_classique.total')?.setValue(null);
      }
    });
    this.form.get('cas_classique.nombre_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_classique.nombre_h')?.value != null) {
        this.form
          .get('cas_classique.total')
          ?.setValue(value + this.form.get('cas_classique.nombre_h')?.value);
      } else {
        this.form.get('cas_classique.total')?.setValue(null);
      }
    });

    this.form.get('cas_classique.cout_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_classique.cout_f')?.value != null) {
        this.form
          .get('cas_classique.total_cout')
          ?.setValue(value + this.form.get('cas_classique.cout_f')?.value);
      } else {
        this.form.get('cas_classique.total_cout')?.setValue(null);
      }
    });

    this.form.get('cas_classique.cout_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_classique.cout_h')?.value != null) {
        this.form
          .get('cas_classique.total_cout')
          ?.setValue(value + this.form.get('cas_classique.cout_h')?.value);
      } else {
        this.form.get('cas_classique.total_cout')?.setValue(null);
      }
    });

    this.form.get('cas_bsf.nombre_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_bsf.nombre_f')?.value != null) {
        this.form
          .get('cas_bsf.total')
          ?.setValue(value + this.form.get('cas_bsf.nombre_f')?.value);
      } else {
        this.form.get('cas_bsf.total')?.setValue(null);
      }
    });
    this.form.get('cas_bsf.nombre_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_bsf.nombre_h')?.value != null) {
        this.form
          .get('cas_bsf.total')
          ?.setValue(value + this.form.get('cas_bsf.nombre_h')?.value);
      } else {
        this.form.get('cas_bsf.total')?.setValue(null);
      }
    });

    this.form.get('cas_bsf.cout_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_bsf.cout_f')?.value != null) {
        this.form
          .get('cas_bsf.total_cout')
          ?.setValue(value + this.form.get('cas_bsf.cout_f')?.value);
      } else {
        this.form.get('cas_bsf.total_cout')?.setValue(null);
      }
    });

    this.form.get('cas_bsf.cout_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_bsf.cout_h')?.value != null) {
        this.form
          .get('cas_bsf.total_cout')
          ?.setValue(value + this.form.get('cas_bsf.cout_h')?.value);
      } else {
        this.form.get('cas_bsf.total_cout')?.setValue(null);
      }
    });

    this.form.get('cas_cec.nombre_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_cec.nombre_f')?.value != null) {
        this.form
          .get('cas_cec.total')
          ?.setValue(value + this.form.get('cas_cec.nombre_f')?.value);
      } else {
        this.form.get('cas_cec.total')?.setValue(null);
      }
    });
    this.form.get('cas_cec.nombre_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_cec.nombre_h')?.value != null) {
        this.form
          .get('cas_cec.total')
          ?.setValue(value + this.form.get('cas_cec.nombre_h')?.value);
      } else {
        this.form.get('cas_cec.total')?.setValue(null);
      }
    });

    this.form.get('cas_cec.cout_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_cec.cout_f')?.value != null) {
        this.form
          .get('cas_cec.total_cout')
          ?.setValue(value + this.form.get('cas_cec.cout_f')?.value);
      } else {
        this.form.get('cas_cec.total_cout')?.setValue(null);
      }
    });

    this.form.get('cas_cec.cout_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_cec.cout_h')?.value != null) {
        this.form
          .get('cas_cec.total_cout')
          ?.setValue(value + this.form.get('cas_cec.cout_h')?.value);
      } else {
        this.form.get('cas_cec.total_cout')?.setValue(null);
      }
    });

    this.form.get('cas_eleve.nombre_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_eleve.nombre_f')?.value != null) {
        this.form
          .get('cas_eleve.total')
          ?.setValue(value + this.form.get('cas_eleve.nombre_f')?.value);
      } else {
        this.form.get('cas_eleve.total')?.setValue(null);
      }
    });
    this.form.get('cas_eleve.nombre_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_eleve.nombre_h')?.value != null) {
        this.form
          .get('cas_eleve.total')
          ?.setValue(value + this.form.get('cas_eleve.nombre_h')?.value);
      } else {
        this.form.get('cas_eleve.total')?.setValue(null);
      }
    });

    this.form.get('cas_eleve.cout_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_eleve.cout_f')?.value != null) {
        this.form
          .get('cas_eleve.total_cout')
          ?.setValue(value + this.form.get('cas_eleve.cout_f')?.value);
      } else {
        this.form.get('cas_eleve.total_cout')?.setValue(null);
      }
    });

    this.form.get('cas_eleve.cout_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('cas_eleve.cout_h')?.value != null) {
        this.form
          .get('cas_eleve.total_cout')
          ?.setValue(value + this.form.get('cas_eleve.cout_h')?.value);
      } else {
        this.form.get('cas_eleve.total_cout')?.setValue(null);
      }
    });

    this.form
      .get('cas_ndongo_daara.nombre_h')
      ?.valueChanges.subscribe((value) => {
        if (this.form.get('cas_ndongo_daara.nombre_f')?.value != null) {
          this.form
            .get('cas_ndongo_daara.total')
            ?.setValue(
              value + this.form.get('cas_ndongo_daara.nombre_f')?.value
            );
        } else {
          this.form.get('cas_ndongo_daara.total')?.setValue(null);
        }
      });
    this.form
      .get('cas_ndongo_daara.nombre_f')
      ?.valueChanges.subscribe((value) => {
        if (this.form.get('cas_ndongo_daara.nombre_h')?.value != null) {
          this.form
            .get('cas_ndongo_daara.total')
            ?.setValue(
              value + this.form.get('cas_ndongo_daara.nombre_h')?.value
            );
        } else {
          this.form.get('cas_ndongo_daara.total')?.setValue(null);
        }
      });

    this.form
      .get('cas_ndongo_daara.cout_h')
      ?.valueChanges.subscribe((value) => {
        if (this.form.get('cas_ndongo_daara.cout_f')?.value != null) {
          this.form
            .get('cas_ndongo_daara.total_cout')
            ?.setValue(value + this.form.get('cas_ndongo_daara.cout_f')?.value);
        } else {
          this.form.get('cas_ndongo_daara.total_cout')?.setValue(null);
        }
      });

    this.form
      .get('cas_ndongo_daara.cout_f')
      ?.valueChanges.subscribe((value) => {
        if (this.form.get('cas_ndongo_daara.cout_h')?.value != null) {
          this.form
            .get('cas_ndongo_daara.total_cout')
            ?.setValue(value + this.form.get('cas_ndongo_daara.cout_h')?.value);
        } else {
          this.form.get('cas_ndongo_daara.total_cout')?.setValue(null);
        }
      });

    this.form.get('total.nombre_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('total.nombre_f')?.value != null) {
        this.form
          .get('total.total')
          ?.setValue(value + this.form.get('total.nombre_f')?.value);
      } else {
        this.form.get('total.total')?.setValue(null);
      }
    });
    this.form.get('total.nombre_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('total.nombre_h')?.value != null) {
        this.form
          .get('total.total')
          ?.setValue(value + this.form.get('total.nombre_h')?.value);
      } else {
        this.form.get('total.total')?.setValue(null);
      }
    });

    this.form.get('total.cout_h')?.valueChanges.subscribe((value) => {
      if (this.form.get('total.cout_f')?.value != null) {
        this.form
          .get('total.total_cout')
          ?.setValue(value + this.form.get('total.cout_f')?.value);
      } else {
        this.form.get('total.total_cout')?.setValue(null);
      }
    });

    this.form.get('total.cout_f')?.valueChanges.subscribe((value) => {
      if (this.form.get('total.cout_h')?.value != null) {
        this.form
          .get('total.total_cout')
          ?.setValue(value + this.form.get('total.cout_h')?.value);
      } else {
        this.form.get('total.total_cout')?.setValue(null);
      }
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const {
        structure,
        cas_classique,
        cas_bsf,
        cas_cec,
        cas_eleve,
        cas_ndongo_daara,
      } = this.form.value;

      const data = {
        ...this.helper.text.addPrefixToObjectPropertyKey(
          cas_classique,
          'cas_classique_'
        ),
        ...this.helper.text.addPrefixToObjectPropertyKey(cas_bsf, 'cas_bsf_'),
        ...this.helper.text.addPrefixToObjectPropertyKey(cas_cec, 'cas_cec_'),
        ...this.helper.text.addPrefixToObjectPropertyKey(
          cas_eleve,
          'cas_eleve_'
        ),
        ...this.helper.text.addPrefixToObjectPropertyKey(
          cas_ndongo_daara,
          'cas_ndongo_daara_'
        ),
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
