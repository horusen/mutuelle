import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { Region } from './region.model';
import { RegionService } from './region.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent
  extends BaseContainerComponent<Region>
  implements OnInit
{
  constructor(
    public regionService: RegionService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(regionService, router, route, 'regions');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-regions',
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    }
  }

  modifer(region: Region) {
    this.regionService.singleData = region;
  }
}
