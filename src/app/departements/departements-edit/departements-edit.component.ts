import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/regions/region.service';
import { DepartementService } from '../departement.service';
import { DepartementsCreateComponent } from '../departements-create/departements-create.component';
import { Departement } from './../departement.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-departements-edit',
  templateUrl: './departements-edit.component.html',
  styleUrls: ['./departements-edit.component.scss'],
})
export class DepartementsEditComponent
  extends DepartementsCreateComponent
  implements OnInit
{
  single!: Departement;
  constructor(
    public departementService: DepartementService,
    public regionService: RegionService
  ) {
    super(departementService, regionService);
  }

  ngOnInit(): void {
    this.subscriptions['departement'] =
      this.departementService.singleData$.subscribe((departement) => {
        this.single = departement;
        this.form = this.fb.group({
          libelle: [this.single.libelle, Validators.required],
          region: [
            this.single.region ? [this.single.region] : null,
            Validators.required,
          ],
        });
      });
  }

  update() {
    this.loading = true;
    this.departementService
      .update(this.single.id, {
        ...this.form.value,
        region: this.formValue('region')[0].id,
      })
      .subscribe(() => {
        this.loading = false;
        this.edited.emit();
        this.helper.notification.alertSuccess();
      });
  }
}
