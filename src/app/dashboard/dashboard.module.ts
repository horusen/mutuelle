import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'node_modules/ng-apexcharts';
import { DateDashboardComponent } from './date-dashboard/date-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent, DateDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DashboardModule {}
