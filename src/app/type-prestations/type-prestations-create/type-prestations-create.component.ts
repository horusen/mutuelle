import { Component, OnInit } from '@angular/core';
import { TypePrestation } from './../type-prestations.model';
import { BaseCreateComponent } from './../../../shared/base-component/base-create.component';
import { TypePrestationsService } from '../type-prestations.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-type-prestations-create',
  templateUrl: './type-prestations-create.component.html',
  styleUrls: ['./type-prestations-create.component.scss'],
})
export class TypePrestationsCreateComponent
  extends BaseCreateComponent<TypePrestation>
  implements OnInit
{
  constructor(public typePrestationService: TypePrestationsService) {
    super(typePrestationService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({ libelle: [null, Validators.required] });
  }

  create() {
    this.loading = true;
    this.typePrestationService.store(this.form.value).subscribe(() => {
      this.loading = false;
      this.helper.notification.alertSuccess();
      this.form.reset();
    });
  }
}
