import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DepartementService } from 'src/app/departements/departement.service';
import { BaseCreateComponent } from 'src/shared/base-component/base-create.component';
import { CommuneService } from '../commune.service';
import { Commune } from './../commune.model';

@Component({
  selector: 'app-communes-create',
  templateUrl: './communes-create.component.html',
  styleUrls: ['./communes-create.component.scss'],
})
export class CommunesCreateComponent
  extends BaseCreateComponent<Commune>
  implements OnInit
{
  departementsLoading = false;
  constructor(
    public communeService: CommuneService,
    public departementService: DepartementService
  ) {
    super(communeService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      libelle: [null, Validators.required],
      departement: [null, Validators.required],
    });
  }

  getDepartements() {
    if (!this.departementService.data.length) {
      this.departementsLoading = true;
      this.departementService.get().subscribe(() => {
        this.loading = false;
      });
    }
  }

  create() {
    this.loading = true;
    this.communeService
      .store({
        ...this.form.value,
        departement: this.formValue('departement')[0].id,
      })
      .subscribe(() => {
        this.loading = false;
        this.helper.notification.alertSuccess();
        this.form.reset();
      });
  }
}
