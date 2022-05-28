import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypePrestationsComponent } from './type-prestations.component';
import { TypePrestationsCreateComponent } from './type-prestations-create/type-prestations-create.component';
import { TypePrestationsListComponent } from './type-prestations-list/type-prestations-list.component';
import { TypePrestationsEditComponent } from './type-prestations-edit/type-prestations-edit.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TypePrestationsComponent,
  },
];

@NgModule({
  declarations: [
    TypePrestationsComponent,
    TypePrestationsCreateComponent,
    TypePrestationsListComponent,
    TypePrestationsEditComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypePrestationsModule {}
