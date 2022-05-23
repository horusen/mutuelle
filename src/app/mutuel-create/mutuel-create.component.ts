import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommuneService } from '../commune.service';
import { DepartementService } from '../departement.service';
import { MutuelleDeSanteService } from '../mutuelle-de-sante.service';
import { RecapitulatifService } from '../recapitulatif.service';
import { RegionService } from '../region.service';
import { TypeDeMutuelleService } from '../type-de-mutuelle.service';

@Component({
  selector: 'app-mutuel-create',
  templateUrl: './mutuel-create.component.html',
  styleUrls: ['./mutuel-create.component.scss'],
})
export class MutuelCreateComponent implements OnInit {
  active = 'structure';
  form!: FormGroup;
  model!: NgbDateStruct;
  dropdownSettings = {
    singleSelection: true,
    labelKey: 'libelle',
    enableSearchFilter: true,
    disabled: false,
  };

  // singleDisabled = {
  //   ...this.single,
  //   disabled: true,
  // };
  constructor(
    public typeService: TypeDeMutuelleService,
    public regionService: RegionService,
    public departementService: DepartementService,
    public communeService: CommuneService,
    public mutuelleService: MutuelleDeSanteService,
    public recapService: RecapitulatifService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initialiseForm();
    this.regionService.getData();
    this.typeService.getData();
  }

  changeNav(nav: any) {
    this.active = nav;
  }

  initialiseForm() {
    this.form = this.fb.group({
      structure: this.fb.group({
        region: [null, Validators.required],
        departement: [null, Validators.required],
        commune: [null, Validators.required],
        mutuelle_de_sante: [null, Validators.required],
        type: [null, Validators.required],
        date: [null, Validators.required],
      }),
      cas_classique: this.fb.group({
        nombre_h: [0, Validators.required],
        nombre_f: [0, Validators.required],
        cout_h: [0, Validators.required],
        cout_f: [0, Validators.required],
        total: [0, Validators.required],
        total_cout: [0, Validators.required],
      }),
      cas_bsf: this.fb.group({
        nombre_h: [0, Validators.required],
        nombre_f: [0, Validators.required],
        cout_h: [0, Validators.required],
        cout_f: [0, Validators.required],
        total: [0, Validators.required],
        total_cout: [0, Validators.required],
      }),
      cas_cec: this.fb.group({
        nombre_h: [0, Validators.required],
        nombre_f: [0, Validators.required],
        cout_h: [0, Validators.required],
        cout_f: [0, Validators.required],
        total: [0, Validators.required],
        total_cout: [0, Validators.required],
      }),
      cas_eleve: this.fb.group({
        nombre_h: [0, Validators.required],
        nombre_f: [0, Validators.required],
        cout_h: [0, Validators.required],
        cout_f: [0, Validators.required],
        total: [0, Validators.required],
        total_cout: [0, Validators.required],
      }),
      cas_ndongo_daara: this.fb.group({
        nombre_h: [0, Validators.required],
        nombre_f: [0, Validators.required],
        cout_h: [0, Validators.required],
        cout_f: [0, Validators.required],
        total: [0, Validators.required],
        total_cout: [0, Validators.required],
      }),
      total: this.fb.group({
        nombre_h: [0, Validators.required],
        nombre_f: [0, Validators.required],
        cout_h: [0, Validators.required],
        cout_f: [0, Validators.required],
        total: [0, Validators.required],
        total_cout: [0, Validators.required],
      }),
    });

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
        this.departementService.getByRegion(value[0].id);
      }
    });

    this.form.get('structure.departement')!.valueChanges.subscribe((value) => {
      this.form.get('structure.commune')!.setValue(null);
      if (value != null) {
        this.communeService.getByDepartement(value[0].id);
      }
    });

    this.form.get('structure.commune')!.valueChanges.subscribe((value) => {
      this.form.get('structure.mutuelle_de_sante')!.setValue(null);
      if (value != null) {
        this.mutuelleService.getByCommune(value[0].id);
        console.log(this.mutuelleService.data);
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

  private calculateTotalHomme() {
    let total =
      this.form.get('cas_classique.nombre_h')?.value +
      this.form.get('cas_bsf.nombre_h')?.value +
      this.form.get('cas_cec.nombre_h')?.value +
      this.form.get('cas_eleve.nombre_h')?.value +
      this.form.get('cas_ndongo_daara.nombre_h')?.value;

    this.form.get('total.nombre_h')?.setValue(total);
  }
  private calculateTotalFemme() {
    let total =
      this.form.get('cas_classique.nombre_f')?.value +
      this.form.get('cas_bsf.nombre_f')?.value +
      this.form.get('cas_cec.nombre_f')?.value +
      this.form.get('cas_eleve.nombre_f')?.value +
      this.form.get('cas_ndongo_daara.nombre_f')?.value;

    this.form.get('total.nombre_f')?.setValue(total);
  }
  private calculateTotal() {
    let total =
      this.form.get('total.nombre_h')?.value +
      this.form.get('total.nombre_f')?.value;
    this.form.get('total.total')?.setValue(total);
  }
  private calculateTotalCoutHomme() {
    let total =
      this.form.get('cas_classique.cout_h')?.value +
      this.form.get('cas_bsf.cout_h')?.value +
      this.form.get('cas_cec.cout_h')?.value +
      this.form.get('cas_eleve.cout_h')?.value +
      this.form.get('cas_ndongo_daara.cout_h')?.value;

    this.form.get('total.cout_h')?.setValue(total);
  }
  private calculateTotalCoutFemme() {
    let total =
      this.form.get('cas_classique.cout_f')?.value +
      this.form.get('cas_bsf.cout_f')?.value +
      this.form.get('cas_cec.cout_f')?.value +
      this.form.get('cas_eleve.cout_f')?.value +
      this.form.get('cas_ndongo_daara.cout_f')?.value;

    this.form.get('total.cout_f')?.setValue(total);
  }
  private calculateTotalCout() {
    let total =
      this.form.get('total.cout_h')?.value +
      this.form.get('total.cout_f')?.value;
    this.form.get('total.total_cout')?.setValue(total);
  }

  private totaux() {
    this.calculateTotalHomme();
    this.calculateTotalFemme();
    this.calculateTotalCoutHomme();
    this.calculateTotalCoutFemme();
    this.calculateTotal();
    this.calculateTotalCout();
  }

  create() {
    this.recapService.setRecap(this.form.value);
    this.router.navigate(['recap']);
  }
}
