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

  modifer(enregistrement: EnregistrementPrestation) {
    this.enregistrementService.singleData = enregistrement;
  }
}
