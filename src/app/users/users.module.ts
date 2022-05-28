import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from 'src/shared/shared.module';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [
    UsersCreateComponent,
    UsersEditComponent,
    UsersListComponent,
    UsersComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersModule {}
