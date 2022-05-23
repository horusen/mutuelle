import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MutuelCreateComponent } from './mutuel-create/mutuel-create.component';
import { RecapitulatifComponent } from './recapitulatif/recapitulatif.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'create',
    component: MutuelCreateComponent,
  },
  {
    path: 'recap',
    component: RecapitulatifComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
