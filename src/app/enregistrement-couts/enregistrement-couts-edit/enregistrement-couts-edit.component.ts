import { Component, OnInit } from '@angular/core';
import { CommuneService } from 'src/app/communes/commune.service';
import { DepartementService } from 'src/app/departements/departement.service';
import { MutuellesService } from 'src/app/mutuelles.service';
import { RegionService } from 'src/app/regions/region.service';
import { TypeMutuellesService } from 'src/app/type-mutuelles/type-mutuelles.service';
import { EnregistrementCoutsCreateComponent } from '../enregistrement-couts-create/enregistrement-couts-create.component';
import { EnregistrementCoutsService } from '../enregistrement-couts.service';
import { EnregistrementCout } from './../enregistrement-couts.model';

@Component({
  selector: 'app-enregistrement-couts-edit',
  templateUrl: './enregistrement-couts-edit.component.html',
  styleUrls: ['./enregistrement-couts-edit.component.scss'],
})
export class EnregistrementCoutsEditComponent
  extends EnregistrementCoutsCreateComponent
  implements OnInit
{
  single: EnregistrementCout | undefined;
  constructor(
    public enregistrementService: EnregistrementCoutsService,
    public typeService: TypeMutuellesService,
    public regionService: RegionService,
    public departementService: DepartementService,
    public communeService: CommuneService,
    public mutuelleService: MutuellesService
  ) {
    super(
      enregistrementService,
      typeService,
      regionService,
      departementService,
      communeService,
      mutuelleService
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
      const {
        structure,
        cas_classique,
        cas_bsf,
        cas_cec,
        cas_eleve,
        cas_ndongo_daara,
      } = this.form.value;

      const data = {
        ...this.helper.text.addPrefixToObjectPropertyKey(
          cas_classique,
          'cas_classique_'
        ),
        ...this.helper.text.addPrefixToObjectPropertyKey(cas_bsf, 'cas_bsf_'),
        ...this.helper.text.addPrefixToObjectPropertyKey(cas_cec, 'cas_cec_'),
        ...this.helper.text.addPrefixToObjectPropertyKey(
          cas_eleve,
          'cas_eleve_'
        ),
        ...this.helper.text.addPrefixToObjectPropertyKey(
          cas_ndongo_daara,
          'cas_ndongo_daara_'
        ),
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
