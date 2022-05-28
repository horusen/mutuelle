import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseSingleComponent } from 'src/shared/base-component/base-single.component';
import { EnregistrementPrestationsService } from '../enregistrement-prestations.service';

@Component({
  selector: 'app-enregistrement-prestations-show',
  templateUrl: './enregistrement-prestations-show.component.html',
  styleUrls: ['./enregistrement-prestations-show.component.scss'],
})
export class EnregistrementPrestationsShowComponent
  extends BaseSingleComponent
  implements AfterViewInit
{
  date: Date = new Date();
  constructor(
    public enregistrementService: EnregistrementPrestationsService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(enregistrementService, route);
  }

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   if (params.id) {
    //     this.helper.modal.show('enregistrement-prestations-show-modal');
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
        this.helper.modal.toggle('enregistrement-prestations-show-modal');
        this.loading = true;
        this.enregistrementService
          .show(+params.id)
          .subscribe((enregistrement) => {
            this.date = new Date(enregistrement.date);
            this.single = enregistrement;
            this.loading = false;
          });
      }
    });
  }
}
