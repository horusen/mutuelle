import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseEditComponent } from 'src/shared/base-component/base-edit.component';
import { TypeMutuellesService } from '../type-mutuelles.service';

@Component({
  selector: 'app-type-mutuelles-edit',
  templateUrl: './type-mutuelles-edit.component.html',
  styleUrls: ['./type-mutuelles-edit.component.scss'],
})
export class TypeMutuellesEditComponent
  extends BaseEditComponent
  implements OnInit
{
  constructor(public typeMutuelleService: TypeMutuellesService) {
    super(typeMutuelleService);
  }

  ngOnInit(): void {
    this.subscriptions['typeMutuelle'] =
      this.typeMutuelleService.singleData$.subscribe((typeMutuelle) => {
        this.single = typeMutuelle;
        this.form = this.fb.group({
          libelle: [this.single.libelle, Validators.required],
        });
      });
  }

  update() {
    this.loading = true;
    this.typeMutuelleService
      .update(this.single.id, this.form.value)
      .subscribe(() => {
        this.loading = false;
        this.edited.emit();
        this.helper.notification.alertSuccess();
      });
  }
}
