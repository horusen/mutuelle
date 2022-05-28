import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnregistrementPrestationsComponent } from './enregistrement-prestations.component';
import { EnregistrementPrestationsListComponent } from './enregistrement-prestations-list/enregistrement-prestations-list.component';
import { EnregistrementPrestationsCreateComponent } from './enregistrement-prestations-create/enregistrement-prestations-create.component';
import { EnregistrementPrestationsEditComponent } from './enregistrement-prestations-edit/enregistrement-prestations-edit.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { EnregistrementPrestationsShowComponent } from './enregistrement-prestations-show/enregistrement-prestations-show.component';

const routes: Routes = [
  {
    path: '',
    component: EnregistrementPrestationsComponent,
    children: [
      {
        path: ':id',
        component: EnregistrementPrestationsShowComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    EnregistrementPrestationsComponent,
    EnregistrementPrestationsListComponent,
    EnregistrementPrestationsCreateComponent,
    EnregistrementPrestationsEditComponent,
    EnregistrementPrestationsShowComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnregistrementPrestationsModule {}
