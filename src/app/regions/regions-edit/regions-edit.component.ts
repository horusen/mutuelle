import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from 'src/shared/base-component/base-edit.component';
import { Region } from '../region.model';
import { RegionService } from '../region.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-regions-edit',
  templateUrl: './regions-edit.component.html',
  styleUrls: ['./regions-edit.component.scss'],
})
export class RegionsEditComponent extends BaseEditComponent implements OnInit {
  constructor(public regionService: RegionService) {
    super(regionService);
  }

  ngOnInit(): void {
    this.subscriptions['region'] = this.regionService.singleData$.subscribe(
      (region) => {
        this.single = region;
        this.form = this.fb.group({
          libelle: [this.single.libelle, Validators.required],
        });
      }
    );
  }

  update() {
    this.loading = true;
    this.regionService.update(this.single.id, this.form.value).subscribe(() => {
      this.loading = false;
      this.edited.emit();
      this.helper.notification.alertSuccess();
    });
  }
}
