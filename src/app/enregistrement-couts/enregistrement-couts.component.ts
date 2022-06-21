import { Component, OnInit } from '@angular/core';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { EnregistrementCout } from './enregistrement-couts.model';
import { EnregistrementCoutsService } from './enregistrement-couts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalLoadingService } from './../modal-loading/modal-loading.service';

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
    public route: ActivatedRoute,
    public modalLoadingService: ModalLoadingService
  ) {
    super(enregistrementService, router, route, 'enregistrement-couts');
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.hideSidebar();
    this.subscriptions['modal'] =
      this.enregistrementService.showModal$.subscribe(() => {
        this.helper.modal.show('enregistrement-couts-show-modal');
      });
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

  downloadDataAsCsv() {
    let name = `${Date.now().toString()}-enrgistement-beneficiaire`;

    this.helper.arrayObject.downloadAsCsv(
      name,
      this.enregistrementService.prepareDataForCsvExporting(),
      [
        'REGION',
        'DEPARTEMENT',
        'COMMUNE',
        'MUTUELLE',
        'TYPE MUTUELLE',
        'DATE',
        'NOMBRE CAS CLASSIQUE H',
        'NOMBRE CAS CLASSIQUE F',
        'NOMBRE CAS CLASSIQUE TOTAL',
        'COUT CAS CLASSIQUE H',
        'COUT CAS CLASSIQUE F',
        'COUT CAS CLASSIQUE TOTAL',
        'NOMBRE CAS BSF H',
        'NOMBRE CAS BSF F',
        'NOMBRE CAS BSF TOTAL',
        'COUT CAS BSF H',
        'COUT CAS BSF F',
        'COUT CAS BSF TOTAL',
        'NOMBRE CAS CEC H',
        'NOMBRE CAS CEC F',
        'NOMBRE CAS CEC TOTAL',
        'COUT CAS CEC H',
        'COUT CAS CEC F',
        'COUT CAS CEC TOTAL',
        'NOMBRE CAS ELEVES H',
        'NOMBRE CAS ELEVES F',
        'NOMBRE CAS ELEVES TOTAL',
        'COUT CAS ELEVES H',
        'COUT CAS ELEVES F',
        'COUT CAS ELEVES TOTAL',
        'NOMBRE CAS NDONGO DAARA H',
        'NOMBRE CAS NDONGO DAARA F',
        'NOMBRE CAS NDONGO DAARA TOTAL',
        'COUT CAS NDONGO DAARA H',
        'COUT CAS NDONGO DAARA F',
        'COUT CAS NDONGO DAARA TOTAL',
        'NOMBRE CAS TOTAL H',
        'NOMBRE CAS TOTAL F',
        'NOMBRE CAS TOTAL',
        'COUT CAS TOTAL H',
        'COUT CAS TOTAL F',
        'COUT CAS TOTAL',
      ]
    );
  }

  onParsedDataFromCsv(data: any) {
    this.modalLoadingService.show('Importation du fichier CSV en cours.');
    let enregistrements = this.parseToEnregistrementCout(data);
    this.enregistrementService
      .storeBulk(enregistrements)
      .subscribe((response) => {
        this.modalLoadingService.hide();
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
