import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnregistrementBeneficiairesService } from '../enregistrement-beneficiaires.service';
import { BaseSingleComponent } from './../../../shared/base-component/base-single.component';

@Component({
  selector: 'app-enregistrement-beneficiaires-show',
  templateUrl: './enregistrement-beneficiaires-show.component.html',
  styleUrls: ['./enregistrement-beneficiaires-show.component.scss'],
})
export class EnregistrementBeneficiairesShowComponent
  extends BaseSingleComponent
  implements AfterViewInit
{
  date: Date = new Date();
  constructor(
    public enregistrementService: EnregistrementBeneficiairesService,
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
