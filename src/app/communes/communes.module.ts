import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunesComponent } from './communes.component';
import { Routes, RouterModule } from '@angular/router';
import { CommunesListComponent } from './communes-list/communes-list.component';
import { CommunesCreateComponent } from './communes-create/communes-create.component';
import { CommunesEditComponent } from './communes-edit/communes-edit.component';
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CommunesComponent,
  },
];

@NgModule({
  declarations: [
    CommunesComponent,
    CommunesListComponent,
    CommunesCreateComponent,
    CommunesEditComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class CommunesModule {}
