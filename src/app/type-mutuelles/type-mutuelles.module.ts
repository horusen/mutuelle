import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeMutuellesComponent } from './type-mutuelles.component';
import { RouterModule, Routes } from '@angular/router';
import { TypeMutuellesCreateComponent } from './type-mutuelles-create/type-mutuelles-create.component';
import { TypeMutuellesListComponent } from './type-mutuelles-list/type-mutuelles-list.component';
import { TypeMutuellesEditComponent } from './type-mutuelles-edit/type-mutuelles-edit.component';
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TypeMutuellesComponent,
  },
];

@NgModule({
  declarations: [
    TypeMutuellesComponent,
    TypeMutuellesCreateComponent,
    TypeMutuellesListComponent,
    TypeMutuellesEditComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeMutuellesModule {}
