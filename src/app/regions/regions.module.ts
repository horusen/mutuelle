import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionsComponent } from './regions.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { RegionsCreateComponent } from './regions-create/regions-create.component';
import { RegionsEditComponent } from './regions-edit/regions-edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RegionsListComponent } from './regions-list/regions-list.component';

const routes: Routes = [
  {
    path: '',
    component: RegionsComponent,
  },
];

@NgModule({
  declarations: [
    RegionsComponent,
    RegionsCreateComponent,
    RegionsEditComponent,
    RegionsListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [RouterModule],
})
export class RegionsModule {}
