import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      {
        path: 'regions',
        loadChildren: () =>
          import('./../regions/regions.module').then(
            (module) => module.RegionsModule
          ),
      },
      {
        path: 'departements',
        loadChildren: () =>
          import('./../departements/departements.module').then(
            (module) => module.DepartementsModule
          ),
      },
      {
        path: 'communes',
        loadChildren: () =>
          import('./../communes/communes.module').then(
            (module) => module.CommunesModule
          ),
      },
      {
        path: 'type-mutuelles',
        loadChildren: () =>
          import('./../type-mutuelles/type-mutuelles.module').then(
            (module) => module.TypeMutuellesModule
          ),
      },
      {
        path: 'type-prestations',
        loadChildren: () =>
          import('./../type-prestations/type-prestations.module').then(
            (module) => module.TypePrestationsModule
          ),
      },
      {
        path: 'utilisateurs',
        loadChildren: () =>
          import('./../users/users.module').then(
            (module) => module.UsersModule
          ),
      },
      {
        path: '**',
        redirectTo: 'regions',
      },
    ],
  },
];

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbNavModule],
  exports: [RouterModule],
})
export class ConfigurationModule {}
