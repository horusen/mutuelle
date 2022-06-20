import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { FormGroup } from '@angular/forms';
import { BaseCreateComponent } from './../../../shared/base-component/base-create.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-date-dashboard',
  templateUrl: './date-dashboard.component.html',
  styleUrls: ['./date-dashboard.component.scss'],
})
export class DateDashboardComponent
  extends BaseCreateComponent
  implements OnInit
{
  form!: FormGroup;
  @Output() triggerGetData = new EventEmitter<any>();

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public dashboardService: DashboardService
  ) {
    super(dashboardService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let debut = params.date_debut ? new Date(params.date_debut) : null;
      let fin = params.date_fin ? new Date(params.date_fin) : null;

      let date_debut = debut
        ? {
            year: debut?.getFullYear(),
            month: debut ? debut.getMonth() + 1 : null,
            day: debut?.getDate(),
          }
        : null;

      let date_fin = fin
        ? {
            year: fin?.getFullYear(),
            month: fin ? fin.getMonth() + 1 : null,
            day: fin?.getDate(),
          }
        : null;

      this.form = this.fb.group({
        date_debut: [date_debut],
        date_fin: [date_fin],
      });
    });
  }

  private applyDate(dateDebut: string | null, dateFin: string | null) {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: { date_debut: dateDebut, date_fin: dateFin },
    });

    this.triggerGetData.emit();
  }

  resetDate() {
    this.applyDate(null, null);
  }

  emitDate() {
    if (this.formValue('date_debut') || this.formValue('date_fin')) {
      this.applyDate(
        this.fromDpDateToString(this.formValue('date_debut')),
        this.fromDpDateToString(this.formValue('date_fin'))
      );
    }
  }
}
