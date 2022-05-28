import { Component, OnInit } from '@angular/core';
import { EnregistrementBeneficiairesCreateComponent } from '../enregistrement-beneficiaires-create/enregistrement-beneficiaires-create.component';
import { EnregistrementBeneficiaire } from '../enregistrement-beneficiaires.model';
import { EnregistrementBeneficiairesService } from '../enregistrement-beneficiaires.service';
import { TypeMutuellesService } from './../../type-mutuelles/type-mutuelles.service';
import { RegionService } from './../../regions/region.service';
import { DepartementService } from './../../departements/departement.service';
import { CommuneService } from './../../communes/commune.service';
import { MutuellesService } from './../../mutuelles.service';

@Component({
  selector: 'app-enregistrement-beneficiaires-edit',
  templateUrl: './enregistrement-beneficiaires-edit.component.html',
  styleUrls: ['./enregistrement-beneficiaires-edit.component.scss'],
})
export class EnregistrementBeneficiairesEditComponent
  extends EnregistrementBeneficiairesCreateComponent
  implements OnInit
{
  single: EnregistrementBeneficiaire | undefined;
  constructor(
    public enregistrementService: EnregistrementBeneficiairesService,
    public typeService: TypeMutuellesService,
    public regionService: RegionService,
    public departementService: DepartementService,
    public communeService: CommuneService,
    public mutuelleService: MutuellesService
  ) {
    super(
      enregistrementService,
      regionService,
      departementService,
      communeService,
      mutuelleService,
      typeService
    );
  }

  ngOnInit(): void {
    this.subscriptions['enregistrement'] =
      this.enregistrementService.singleData$.subscribe((enregistrement) => {
        this.single = enregistrement;
        this.initialiseForm(enregistrement);

        this.getDepartementsByRegion(this.formValue('structure.region')[0].id);
        this.getCommunesByDepartement(
          this.formValue('structure.departement')[0].id
        );
        this.getMutuellesByCommuneAndByType(
          this.formValue('structure.commune')[0].id,
          this.formValue('structure.type')[0].id
        );
      });
  }

  update() {
    if (this.form.valid && this.single?.id) {
      this.loading = true;
      const { structure, beneficiaire } = this.form.value;

      const data = {
        ...beneficiaire,
        date: this.fromDpDateToString(structure.date),
        mutuelle: structure.mutuelle_de_sante[0].id,
      };

      this.enregistrementService.update(this.single.id, data).subscribe(() => {
        this.loading = false;
        this.helper.notification.alertSuccess();
        this.edited.emit();
      });
    } else {
      this.helper.notification.toastDanger('Formulaire invalide');
    }
  }
}
