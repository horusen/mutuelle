import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartementsComponent } from './departements.component';
import { RouterModule, Routes } from '@angular/router';
import { DepartementsCreateComponent } from './departements-create/departements-create.component';
import { DepartementsEditComponent } from './departements-edit/departements-edit.component';
import { DepartementsListComponent } from './departements-list/departements-list.component';
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DepartementsComponent,
  },
];

@NgModule({
  declarations: [
    DepartementsComponent,
    DepartementsCreateComponent,
    DepartementsEditComponent,
    DepartementsListComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartementsModule {}
