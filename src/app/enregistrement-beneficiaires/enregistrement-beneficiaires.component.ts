import { Component, OnInit } from '@angular/core';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { EnregistrementBeneficiaire } from './enregistrement-beneficiaires.model';
import { EnregistrementBeneficiairesService } from './enregistrement-beneficiaires.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enregistrement-beneficiaires',
  templateUrl: './enregistrement-beneficiaires.component.html',
  styleUrls: ['./enregistrement-beneficiaires.component.scss'],
})
export class EnregistrementBeneficiairesComponent
  extends BaseContainerComponent<EnregistrementBeneficiaire>
  implements OnInit
{
  constructor(
    public enregistrementService: EnregistrementBeneficiairesService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(enregistrementService, router, route, 'enregistrement-beneficiaires');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-enregistrement-beneficiaires',
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    } else if (event.action == 'show') {
      this.router.navigate([event.data.id], { relativeTo: this.route });
      this.helper.modal.show('enregistrement-beneficiaires-show-modal');
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
        'NOMBRE ADHERENT ',
        'NOMBRE BENEFICIAIRE',
        'NOMBRE BENEFICIAIRE A JOUR',
        'DETTE ETAT',
      ]
    );
  }

  onParsedDataFromCsv(data: any) {
    let enregistrements = this.parseToEnregistrementBeneficiaire(data);
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

  parseToEnregistrementBeneficiaire(items: any[]) {
    let preEnregistrement: EnregistrementBeneficiaire[] = [];

    items.forEach((item) => {
      let newItem = this.helper.text.serializeObjectPropertyKey(item);
      preEnregistrement.push(newItem);
    });

    const enregistrements = preEnregistrement.map((enregistrement) => {
      return this.helper.object.getSubset(enregistrement, [
        'region',
        'date',
        'departement',
        'commune',
        'mutuelle',
        'nombre_adherent',
        'nombre_beneficiaire',
        'nombre_beneficiaire_a_jour',
        'dette_etat',
      ]);
    });

    return enregistrements;
  }

  modifer(enregistrement: EnregistrementBeneficiaire) {
    this.enregistrementService.singleData = enregistrement;
  }
}
