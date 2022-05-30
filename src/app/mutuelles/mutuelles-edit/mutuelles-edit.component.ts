import { Component, OnInit } from '@angular/core';
import { MutuellesService } from 'src/app/mutuelles.service';
import { MutuellesCreateComponent } from '../mutuelles-create/mutuelles-create.component';
import { DepartementService } from 'src/app/departements/departement.service';
import { RegionService } from 'src/app/regions/region.service';
import { CommuneService } from 'src/app/communes/commune.service';
import { TypeMutuellesService } from 'src/app/type-mutuelles/type-mutuelles.service';
import { Mutuelle } from '../mutuelles.model';

@Component({
  selector: 'app-mutuelles-edit',
  templateUrl: './mutuelles-edit.component.html',
  styleUrls: ['./mutuelles-edit.component.scss'],
})
export class MutuellesEditComponent
  extends MutuellesCreateComponent
  implements OnInit
{
  single!: Mutuelle;
  constructor(
    public mutuelleService: MutuellesService,
    public departementService: DepartementService,
    public regionService: RegionService,
    public communeService: CommuneService,
    public typeService: TypeMutuellesService
  ) {
    super(
      mutuelleService,
      departementService,
      regionService,
      communeService,
      typeService
    );
  }

  ngOnInit(): void {
    this.subscriptions['mutuelle'] = this.mutuelleService.singleData$.subscribe(
      (mutuelle) => {
        this.single = mutuelle;
        this.initialiseForm(mutuelle);
      }
    );
  }

  update() {
    if (this.form.valid) {
      this.loading = true;
      this.mutuelleService
        .update(this.single.id!, {
          ...this.form.value,
          commune: this.formValue('commune')[0].id,
          type: this.formValue('type')[0].id,
        })
        .subscribe(() => {
          this.loading = false;
          this.helper.notification.alertSuccess();
          this.edited.emit();
        });
    } else {
      this.helper.notification.alertDanger('Formulaire invalide');
    }
  }
}
