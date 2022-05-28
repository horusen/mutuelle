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

  modifer(enregistrement: EnregistrementCout) {
    this.enregistrementService.singleData = enregistrement;
  }
}
