import { Component, OnInit } from '@angular/core';
import { EnregistrementPrestation } from './enregistrement-prestations.model';
import { BaseContainerComponent } from './../../shared/base-component/base-container.component';
import { EnregistrementPrestationsService } from './enregistrement-prestations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalLoadingService } from '../modal-loading/modal-loading.service';

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
    public route: ActivatedRoute,
    public modalLoadingService: ModalLoadingService
  ) {
    super(enregistrementService, router, route, 'enregistrement-prestations');
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.hideSidebar();
    this.subscriptions['modal'] =
      this.enregistrementService.showModal$.subscribe(() => {
        this.helper.modal.show('enregistrement-beneficiaires-show-modal');
      });
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
    this.modalLoadingService.show('Importation du fichier CSV en cours.');
    let enregistrements = this.parseToEnregistrementPrestation(data);
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
        'TYPE PRESTATION',
        'DATE',
        'NOMBRE CAS CLASSIQUE H',
        'NOMBRE CAS CLASSIQUE F',
        'NOMBRE CAS CLASSIQUE TOTAL',
        'NOMBRE CAS BSF H',
        'NOMBRE CAS BSF F',
        'NOMBRE CAS BSF TOTAL',
        'NOMBRE CAS CEC H',
        'NOMBRE CAS CEC F',
        'NOMBRE CAS CEC TOTAL',
        'NOMBRE CAS ELEVES H',
        'NOMBRE CAS ELEVES F',
        'NOMBRE CAS ELEVES TOTAL',
        'NOMBRE CAS NDONGO DAARA H',
        'NOMBRE CAS NDONGO DAARA F',
        'NOMBRE CAS NDONGO DAARA TOTAL',
        'NOMBRE CAS TOTAL H',
        'NOMBRE CAS TOTAL F',
        'NOMBRE CAS TOTAL',
      ]
    );
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
