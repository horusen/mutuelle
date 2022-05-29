import { Component, OnInit } from '@angular/core';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { EnregistrementCout } from './enregistrement-couts.model';
import { EnregistrementCoutsService } from './enregistrement-couts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enregistrement-couts',
  templateUrl: './enregistrement-couts.component.html',
  styleUrls: ['./enregistrement-couts.component.scss'],
})
export class EnregistrementCoutsComponent
  extends BaseContainerComponent<EnregistrementCout>
  implements OnInit
{
  constructor(
    public enregistrementService: EnregistrementCoutsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(enregistrementService, router, route, 'enregistrement-couts');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-enregistrement-couts',
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
    let enregistrements = this.parseToEnregistrementCout(data);
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

  parseToEnregistrementCout(items: any[]) {
    let preEnregistrement: EnregistrementCout[] = [];

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
        'date',
        'cas_classique_h',
        'cas_classique_f',
        'cas_classique_cout_h',
        'cas_classique_cout_f',
        'cas_cec_h',
        'cas_cec_f',
        'cas_cec_cout_h',
        'cas_cec_cout_f',
        'cas_bsf_h',
        'cas_bsf_f',
        'cas_bsf_cout_h',
        'cas_bsf_cout_f',
        'cas_eleve_h',
        'cas_eleve_f',
        'cas_eleve_cout_h',
        'cas_eleve_cout_f',
        'cas_ndongo_daara_h',
        'cas_ndongo_daara_f',
        'cas_ndongo_daara_cout_h',
        'cas_ndongo_daara_cout_f',
      ]);
    });

    return enregistrements;
  }

  modifer(enregistrement: EnregistrementCout) {
    this.enregistrementService.singleData = enregistrement;
  }
}
