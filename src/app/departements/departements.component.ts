import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { Departement } from './departement.model';
import { DepartementService } from './departement.service';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.scss'],
})
export class DepartementsComponent
  extends BaseContainerComponent<Departement>
  implements OnInit
{
  constructor(
    public departementService: DepartementService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(departementService, router, route, 'departements');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-departements',
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    }
  }

  modifer(departement: Departement) {
    this.departementService.singleData = departement;
  }
}
