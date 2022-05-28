import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DepartementService } from 'src/app/departements/departement.service';
import { CommuneService } from '../commune.service';
import { CommunesCreateComponent } from '../communes-create/communes-create.component';
import { Commune } from './../commune.model';

@Component({
  selector: 'app-communes-edit',
  templateUrl: './communes-edit.component.html',
  styleUrls: ['./communes-edit.component.scss'],
})
export class CommunesEditComponent
  extends CommunesCreateComponent
  implements OnInit
{
  single!: Commune;
  constructor(
    public communeService: CommuneService,
    public departementService: DepartementService
  ) {
    super(communeService, departementService);
  }

  ngOnInit(): void {
    this.subscriptions['commune'] = this.communeService.singleData$.subscribe(
      (commune) => {
        this.single = commune;
        this.form = this.fb.group({
          libelle: [this.single.libelle, Validators.required],
          departement: [[this.single.departement], Validators.required],
        });
      }
    );
  }

  update() {
    this.loading = true;
    this.communeService
      .update(this.single.id, {
        ...this.form.value,
        departement: this.formValue('departement')[0].id,
      })
      .subscribe(() => {
        this.loading = false;
        this.edited.emit();
        this.helper.notification.alertSuccess();
      });
  }
}
