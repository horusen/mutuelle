import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Region } from 'src/app/regions/region.model';
import { RegionService } from 'src/app/regions/region.service';
import { BaseCreateComponent } from 'src/shared/base-component/base-create.component';
import { DepartementService } from '../departement.service';
import { Departement } from './../departement.model';

@Component({
  selector: 'app-departements-create',
  templateUrl: './departements-create.component.html',
  styleUrls: ['./departements-create.component.scss'],
})
export class DepartementsCreateComponent
  extends BaseCreateComponent<Departement>
  implements OnInit
{
  regionsLoading = false;
  constructor(
    public departementService: DepartementService,
    public regionService: RegionService
  ) {
    super(departementService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      libelle: [null, Validators.required],
      region: [null, Validators.required],
    });
  }

  getRegions() {
    if (!this.regionService.data.length) {
      this.regionsLoading = true;
      this.regionService.get().subscribe(() => {
        this.loading = false;
      });
    }
  }

  create() {
    this.loading = true;
    this.departementService
      .store({ ...this.form.value, region: this.formValue('region')[0].id })
      .subscribe(() => {
        this.loading = false;
        this.helper.notification.alertSuccess();
        this.form.reset();
      });
  }
}
