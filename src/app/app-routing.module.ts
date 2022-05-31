import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PageBadUrlComponent } from './page-bad-url/page-bad-url.component';

const routes: Routes = [
  {
    path: 'authentification',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'bad-url',
    component: PageBadUrlComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./unamusc/unamusc.module').then((module) => module.UnamuscModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
