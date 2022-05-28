import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnregistrementCoutsListComponent } from './enregistrement-couts-list/enregistrement-couts-list.component';
import { EnregistrementCoutsCreateComponent } from './enregistrement-couts-create/enregistrement-couts-create.component';
import { EnregistrementCoutsEditComponent } from './enregistrement-couts-edit/enregistrement-couts-edit.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { EnregistrementCoutsComponent } from './enregistrement-couts.component';
import { EnregistrementCoutsShowComponent } from './enregistrement-couts-show/enregistrement-couts-show.component';

const routes: Routes = [
  {
    path: '',
    component: EnregistrementCoutsComponent,
    children: [
      {
        path: ':id',
        component: EnregistrementCoutsShowComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    EnregistrementCoutsListComponent,
    EnregistrementCoutsCreateComponent,
    EnregistrementCoutsEditComponent,
    EnregistrementCoutsComponent,
    EnregistrementCoutsShowComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnregistrementCoutsModule {}
