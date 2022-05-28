import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { Mutuelle } from './mutuelles.model';
import { MutuellesService } from './../mutuelles.service';

@Component({
  selector: 'app-mutuelles',
  templateUrl: './mutuelles.component.html',
  styleUrls: ['./mutuelles.component.scss'],
})
export class MutuellesComponent
  extends BaseContainerComponent<Mutuelle>
  implements OnInit
{
  constructor(
    public mutuelleService: MutuellesService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(mutuelleService, router, route, 'mutuelles');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-mutuelles',
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    }
  }

  modifer(mutuelle: Mutuelle) {
    this.mutuelleService.singleData = mutuelle;
  }
}
