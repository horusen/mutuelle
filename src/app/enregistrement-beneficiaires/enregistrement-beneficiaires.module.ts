import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnregistrementBeneficiairesComponent } from './enregistrement-beneficiaires.component';
import { EnregistrementBeneficiairesListComponent } from './enregistrement-beneficiaires-list/enregistrement-beneficiaires-list.component';
import { EnregistrementBeneficiairesCreateComponent } from './enregistrement-beneficiaires-create/enregistrement-beneficiaires-create.component';
import { EnregistrementBeneficiairesEditComponent } from './enregistrement-beneficiaires-edit/enregistrement-beneficiaires-edit.component';
import { EnregistrementBeneficiairesShowComponent } from './enregistrement-beneficiaires-show/enregistrement-beneficiaires-show.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EnregistrementBeneficiairesComponent,
    children: [
      {
        path: ':id',
        component: EnregistrementBeneficiairesShowComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    EnregistrementBeneficiairesComponent,
    EnregistrementBeneficiairesListComponent,
    EnregistrementBeneficiairesCreateComponent,
    EnregistrementBeneficiairesEditComponent,
    EnregistrementBeneficiairesShowComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnregistrementBeneficiairesModule {}
