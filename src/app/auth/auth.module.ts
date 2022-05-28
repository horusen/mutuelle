import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionComponent } from './inscription/inscription.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: '**',
    redirectTo: 'connexion',
  },
];

@NgModule({
  declarations: [InscriptionComponent, ConnexionComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModule {}
