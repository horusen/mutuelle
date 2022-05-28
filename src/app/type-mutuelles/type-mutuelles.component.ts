import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { TypeMutuelle } from './type-mutuelles.model';
import { TypeMutuellesService } from './type-mutuelles.service';

@Component({
  selector: 'app-type-mutuelles',
  templateUrl: './type-mutuelles.component.html',
  styleUrls: ['./type-mutuelles.component.scss'],
})
export class TypeMutuellesComponent
  extends BaseContainerComponent<TypeMutuelle>
  implements OnInit
{
  constructor(
    public typeMutuelleService: TypeMutuellesService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(typeMutuelleService, router, route, 'type-mutuelles');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-typeMutuelles',
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    }
  }

  modifer(typeMutuelle: TypeMutuelle) {
    this.typeMutuelleService.singleData = typeMutuelle;
  }
}
