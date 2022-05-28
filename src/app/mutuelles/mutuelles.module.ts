import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { MutuellesCreateComponent } from './mutuelles-create/mutuelles-create.component';
import { MutuellesListComponent } from './mutuelles-list/mutuelles-list.component';
import { MutuellesEditComponent } from './mutuelles-edit/mutuelles-edit.component';
import { MutuellesComponent } from './mutuelles.component';

const routes: Routes = [
  {
    path: '',
    component: MutuellesComponent,
  },
];

@NgModule({
  declarations: [
    MutuellesComponent,
    MutuellesCreateComponent,
    MutuellesListComponent,
    MutuellesEditComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MutuellesModule {}
