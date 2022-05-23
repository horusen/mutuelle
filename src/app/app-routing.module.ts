import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MutuelCreateComponent } from './mutuel-create/mutuel-create.component';
import { MutuelShowComponent } from './mutuel-show/mutuel-show.component';
import { MutuelleListComponent } from './mutuelle-list/mutuelle-list.component';
import { RecapitulatifComponent } from './recapitulatif/recapitulatif.component';

const routes: Routes = [
  {
    path: 'list',
    component: MutuelleListComponent,
  },
  {
    path: 'create',
    component: MutuelCreateComponent,
  },
  {
    path: 'recap',
    component: RecapitulatifComponent,
  },
  {
    path: 'recap/:id',
    component: MutuelShowComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
