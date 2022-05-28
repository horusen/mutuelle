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

  modifer(enregistrement: EnregistrementBeneficiaire) {
    this.enregistrementService.singleData = enregistrement;
  }
}
