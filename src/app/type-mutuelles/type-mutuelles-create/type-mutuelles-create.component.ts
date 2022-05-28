import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseCreateComponent } from 'src/shared/base-component/base-create.component';
import { TypeMutuellesService } from '../type-mutuelles.service';
import { TypeMutuelle } from './../type-mutuelles.model';

@Component({
  selector: 'app-type-mutuelles-create',
  templateUrl: './type-mutuelles-create.component.html',
  styleUrls: ['./type-mutuelles-create.component.scss'],
})
export class TypeMutuellesCreateComponent
  extends BaseCreateComponent<TypeMutuelle>
  implements OnInit
{
  constructor(public typeMutuelleService: TypeMutuellesService) {
    super(typeMutuelleService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({ libelle: [null, Validators.required] });
  }

  create() {
    this.loading = true;
    this.typeMutuelleService.store(this.form.value).subscribe(() => {
      this.loading = false;
      this.helper.notification.alertSuccess();
      this.form.reset();
    });
  }
}
