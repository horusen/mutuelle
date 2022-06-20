import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'apexcharts';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  chartOptions!: Partial<ApexOptions>;
  constructor(
    public dashboardService: DashboardService,
    public route: ActivatedRoute
  ) {
    super(dashboardService);
  }

  ngOnInit(): void {
    this.initChartOptions();
    this.route.queryParams.subscribe((params) => {
      this.getData(params.date_debut || null, params.date_fin || null);
    });
  }

  initChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: '',
          data: [125, 968, 58],
        },
      ],

      chart: {
        height: 600,
        type: 'bar',
      },
      colors: ['#00E396', '#FEB019', '#FF4560'],

      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      title: {
        text: "Nombre d'enregistrement par categorie",
      },
      xaxis: {
        categories: [
          'Enregistrement coûts',
          'Enregistrement prestations',
          'Enregistrement bénéficiaires',
        ],
        labels: {
          style: {
            colors: ['#00E396', '#FEB019', '#FF4560'],
            fontSize: '16px',
            fontWeight: 600,
          },
        },
      },
    };
  }

  getData(dateDebut?: string, dateFin?: string) {
    this.loading = true;
    this.dashboardService.getData(dateDebut, dateFin).subscribe((data) => {
      this.chartOptions.series = [
        {
          name: '',
          data: [
            data.enregistrement_couts,
            data.enregistrement_prestations,
            data.enregistrement_beneficiaires,
          ],
        },
      ];

      console.log(this.chartOptions.series);

      this.loading = false;
    });
  }
}
