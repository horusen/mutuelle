import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseSingleComponent } from 'src/shared/base-component/base-single.component';
import { EnregistrementCoutsService } from '../enregistrement-couts.service';

@Component({
  selector: 'app-enregistrement-couts-show',
  templateUrl: './enregistrement-couts-show.component.html',
  styleUrls: ['./enregistrement-couts-show.component.scss'],
})
export class EnregistrementCoutsShowComponent
  extends BaseSingleComponent
  implements AfterViewInit
{
  date: Date = new Date();
  constructor(
    public enregistrementService: EnregistrementCoutsService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(enregistrementService, route);
  }

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   if (params.id) {
    //     this.helper.modal.show('enregistrement-couts-show-modal');
    //     this.loading = true;
    //     this.enregistrementService
    //       .show(+params.id)
    //       .subscribe((enregistrement) => {
    //         this.date = new Date(enregistrement.date);
    //         this.single = enregistrement;
    //         this.loading = false;
    //       });
    //   }
    // });
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.helper.modal.toggle('enregistrement-couts-show-modal');
        this.loading = true;
        this.enregistrementService
          .show(+params.id)
          .subscribe((enregistrement) => {
            this.enregistrementService.showModal$.next();
            this.date = new Date(enregistrement.date);
            this.single = enregistrement;
            this.loading = false;
          });
      }
    });
  }
}
