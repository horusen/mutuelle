import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbPopoverModule,
  NgbTooltipModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { LoadingModule } from './loading/loading.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from './modal/modal.module';
import { CsvParserModule } from 'src/shared/csv-parser/csv-parser.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoadingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMultiSelectModule,
    Ng2SmartTableModule,
    NgbPopoverModule,
    ModalModule,
    NgbModule,
    CsvParserModule,
  ],
  exports: [
    LoadingModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMultiSelectModule,
    Ng2SmartTableModule,
    NgbPopoverModule,
    ModalModule,
    NgbModule,
    CsvParserModule,
  ],
})
export class SharedModule {}
