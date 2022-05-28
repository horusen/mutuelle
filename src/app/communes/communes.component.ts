import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { Commune } from './commune.model';
import { CommuneService } from './commune.service';

@Component({
  selector: 'app-communes',
  templateUrl: './communes.component.html',
  styleUrls: ['./communes.component.scss'],
})
export class CommunesComponent
  extends BaseContainerComponent<Commune>
  implements OnInit
{
  constructor(
    public communeService: CommuneService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(communeService, router, route, 'communes');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-communes',
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    }
  }

  modifer(commune: Commune) {
    this.communeService.singleData = commune;
  }
}
