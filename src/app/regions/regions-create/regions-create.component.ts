import { Component, OnInit } from '@angular/core';
import { BaseCreateComponent } from 'src/shared/base-component/base-create.component';
import { RegionService } from '../region.service';
import { Validators } from '@angular/forms';
import { Region } from '../region.model';

@Component({
  selector: 'app-regions-create',
  templateUrl: './regions-create.component.html',
  styleUrls: ['./regions-create.component.scss'],
})
export class RegionsCreateComponent
  extends BaseCreateComponent<Region>
  implements OnInit
{
  constructor(public regionService: RegionService) {
    super(regionService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({ libelle: [null, Validators.required] });
  }

  create() {
    this.loading = true;
    this.regionService.store(this.form.value).subscribe(() => {
      this.loading = false;
      this.helper.notification.alertSuccess();
      this.form.reset();
    });
  }
}
