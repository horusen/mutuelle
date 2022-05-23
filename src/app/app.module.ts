import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MutuelCreateComponent } from './mutuel-create/mutuel-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecapitulatifComponent } from './recapitulatif/recapitulatif.component';
import { MutuelleListComponent } from './mutuelle-list/mutuelle-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MutuelShowComponent } from './mutuel-show/mutuel-show.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    MutuelCreateComponent,
    DashboardComponent,
    RecapitulatifComponent,
    MutuelleListComponent,
    MutuelShowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SmartTableModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
