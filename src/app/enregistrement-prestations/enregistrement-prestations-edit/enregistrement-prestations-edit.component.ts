import { Component, OnInit } from '@angular/core';
import { TypeMutuellesService } from 'src/app/type-mutuelles/type-mutuelles.service';
import { EnregistrementPrestationsCreateComponent } from '../enregistrement-prestations-create/enregistrement-prestations-create.component';
import { EnregistrementPrestationsService } from '../enregistrement-prestations.service';
import { EnregistrementPrestation } from './../enregistrement-prestations.model';
import { RegionService } from './../../regions/region.service';
import { DepartementService } from 'src/app/departements/departement.service';
import { CommuneService } from './../../communes/commune.service';
import { MutuellesService } from './../../mutuelles.service';
import { EnregistrementCoutsService } from 'src/app/enregistrement-couts/enregistrement-couts.service';
import { TypePrestationsService } from 'src/app/type-prestations/type-prestations.service';

@Component({
  selector: 'app-enregistrement-prestations-edit',
  templateUrl: './enregistrement-prestations-edit.component.html',
  styleUrls: ['./enregistrement-prestations-edit.component.scss'],
})
export class EnregistrementPrestationsEditComponent
  extends EnregistrementPrestationsCreateComponent
  implements OnInit
{
  single: EnregistrementPrestation | undefined;
  constructor(
    public enregistrementPrestationService: EnregistrementPrestationsService,
    public typeService: TypeMutuellesService,
    public regionService: RegionService,
    public departementService: DepartementService,
    public communeService: CommuneService,
    public mutuelleService: MutuellesService,
    public typeMutuelleService: TypeMutuellesService,
    public typePrestationService: TypePrestationsService
  ) {
    super(
      enregistrementPrestationService,
      regionService,
      departementService,
      communeService,
      mutuelleService,
      typeMutuelleService,
      typePrestationService
    );
  }

  ngOnInit(): void {
    this.dependancies['typePrestations'] = [];
    this.dependanciesLoading['typePrestations'] = false;
    this.subscriptions['enregistrement'] =
      this.enregistrementPrestationService.singleData$.subscribe(
        (enregistrement) => {
          console.log(enregistrement);

          this.single = enregistrement;
          this.initialiseForm(enregistrement);

          this.getDepartementsByRegion(
            this.formValue('structure.region')[0].id
          );
          this.getCommunesByDepartement(
            this.formValue('structure.departement')[0].id
          );
          this.getMutuellesByCommuneAndByType(
            this.formValue('structure.commune')[0].id,
            this.formValue('structure.type')[0].id
          );
        }
      );
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
        type_prestation: structure.type_prestation[0].id,
      };

      this.enregistrementPrestationService
        .update(this.single.id, data)
        .subscribe(() => {
          this.loading = false;
          this.helper.notification.alertSuccess();
          this.edited.emit();
        });
    } else {
      this.helper.notification.toastDanger('Formulaire invalide');
    }
  }
}
