import { Component, OnInit } from '@angular/core';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { TypePrestation } from './type-prestations.model';
import { TypePrestationsService } from './type-prestations.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-prestations',
  templateUrl: './type-prestations.component.html',
  styleUrls: ['./type-prestations.component.scss'],
})
export class TypePrestationsComponent
  extends BaseContainerComponent<TypePrestation>
  implements OnInit
{
  constructor(
    public typePrestationService: TypePrestationsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(typePrestationService, router, route, 'typePrestations');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-typePrestations',
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    }
  }

  modifer(typePrestation: TypePrestation) {
    this.typePrestationService.singleData = typePrestation;
  }
}
