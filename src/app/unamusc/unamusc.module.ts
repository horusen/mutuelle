import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnamuscComponent } from './unamusc.component';
import { MutuelCreateComponent } from '../mutuel-create/mutuel-create.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RecapitulatifComponent } from '../recapitulatif/recapitulatif.component';
import { MutuelleListComponent } from '../mutuelle-list/mutuelle-list.component';
import { MutuelShowComponent } from '../mutuel-show/mutuel-show.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UnamuscComponent,
    children: [
      {
        path: 'mutuelles',
        loadChildren: () =>
          import('./../mutuelles/mutuelles.module').then(
            (module) => module.MutuellesModule
          ),
      },
      {
        path: 'enregistrement-couts',
        loadChildren: () =>
          import('./../enregistrement-couts/enregistrement-couts.module').then(
            (module) => module.EnregistrementCoutsModule
          ),
      },
      {
        path: 'enregistrement-prestations',
        loadChildren: () =>
          import(
            './../enregistrement-prestations/enregistrement-prestations.module'
          ).then((module) => module.EnregistrementPrestationsModule),
      },
      {
        path: 'enregistrement-beneficiaires',
        loadChildren: () =>
          import(
            './../enregistrement-beneficiaires/enregistrement-beneficiaires.module'
          ).then((module) => module.EnregistrementBeneficiairesModule),
      },
      {
        path: 'configurations',
        loadChildren: () =>
          import('./../configuration/configuration.module').then(
            (module) => module.ConfigurationModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    UnamuscComponent,
    MutuelCreateComponent,
    DashboardComponent,
    RecapitulatifComponent,
    MutuelleListComponent,
    MutuelShowComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnamuscModule {}
