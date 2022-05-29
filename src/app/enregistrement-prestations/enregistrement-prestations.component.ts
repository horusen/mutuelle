import { Component, OnInit } from '@angular/core';
import { EnregistrementPrestation } from './enregistrement-prestations.model';
import { BaseContainerComponent } from './../../shared/base-component/base-container.component';
import { EnregistrementPrestationsService } from './enregistrement-prestations.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enregistrement-prestations',
  templateUrl: './enregistrement-prestations.component.html',
  styleUrls: ['./enregistrement-prestations.component.scss'],
})
export class EnregistrementPrestationsComponent
  extends BaseContainerComponent<EnregistrementPrestation>
  implements OnInit
{
  constructor(
    public enregistrementService: EnregistrementPrestationsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(enregistrementService, router, route, 'enregistrement-prestations');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-enregistrement-prestations',
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    } else if (event.action == 'show') {
      this.router.navigate([event.data.id], { relativeTo: this.route });
    }
  }

  onParsedDataFromCsv(data: any) {
    let enregistrements = this.parseToEnregistrementPrestation(data);
    this.enregistrementService
      .storeBulk(enregistrements)
      .subscribe((response) => {
        this.helper.notification.alertSuccess();
        setTimeout(() => {
          this.helper.notification.toastSuccess(
            `${response.length} élément(s) sur ${enregistrements.length} ont été enregistré avec succés!`
          );
        }, 1500);
      });
  }

  parseToEnregistrementPrestation(items: any[]) {
    let preEnregistrement: EnregistrementPrestation[] = [];

    items.forEach((item) => {
      let newItem = this.helper.text.serializeObjectPropertyKey(item);
      preEnregistrement.push(newItem);
    });

    const enregistrements = preEnregistrement.map((enregistrement) => {
      return this.helper.object.getSubset(enregistrement, [
        'region',
        'departement',
        'commune',
        'mutuelle',
        'type_prestation',
        'date',
        'cas_classique_h',
        'cas_classique_f',
        'cas_cec_h',
        'cas_cec_f',
        'cas_bsf_h',
        'cas_bsf_f',
        'cas_eleve_h',
        'cas_eleve_f',
        'cas_ndongo_daara_h',
        'cas_ndongo_daara_f',
      ]);
    });

    return enregistrements;
  }

  modifer(enregistrement: EnregistrementPrestation) {
    this.enregistrementService.singleData = enregistrement;
  }
}
