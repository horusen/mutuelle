import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from 'src/shared/base-component/base-edit.component';
import { TypePrestationsService } from '../type-prestations.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-type-prestations-edit',
  templateUrl: './type-prestations-edit.component.html',
  styleUrls: ['./type-prestations-edit.component.scss'],
})
export class TypePrestationsEditComponent
  extends BaseEditComponent
  implements OnInit
{
  constructor(public typePrestationService: TypePrestationsService) {
    super(typePrestationService);
  }

  ngOnInit(): void {
    this.subscriptions['typePrestation'] =
      this.typePrestationService.singleData$.subscribe((typePrestation) => {
        this.single = typePrestation;
        this.form = this.fb.group({
          libelle: [this.single.libelle, Validators.required],
        });
      });
  }

  update() {
    this.loading = true;
    this.typePrestationService
      .update(this.single.id, this.form.value)
      .subscribe(() => {
        this.loading = false;
        this.edited.emit();
        this.helper.notification.alertSuccess();
      });
  }
}
