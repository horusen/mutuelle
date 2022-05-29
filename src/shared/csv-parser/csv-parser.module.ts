import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvParserComponent } from './csv-parser.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';

@NgModule({
  declarations: [CsvParserComponent],
  imports: [CommonModule, NgxCsvParserModule],
  exports: [CsvParserComponent],
})
export class CsvParserModule {}
