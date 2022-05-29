import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { tap } from 'rxjs/operators';
import { Helper } from 'src/shared/helper/helper';

@Component({
  selector: 'app-csv-parser',
  templateUrl: './csv-parser.component.html',
  styleUrls: ['./csv-parser.component.scss'],
})
export class CsvParserComponent implements OnInit {
  @Output() data = new EventEmitter<any[]>();
  constructor(public helper: Helper, public csvParser: NgxCsvParser) {}

  ngOnInit(): void {}

  async onCsvUploaded(event: any) {
    let file = event.target.files[0];

    // Check if the file is valid csv
    if (!this.csvParser.isCSVFile(file)) {
      this.helper.notification.toastDanger('Le format du fichier est érroné');
      return;
    }

    // Get csv data as an array
    let resultats = await this.fromCsvFileToArray(file);

    // Check if error did not occur whern
    if (resultats instanceof NgxCSVParserError) {
      this.helper.notification.toastDanger(
        "Erreur lors de l'importation du fichier"
      );

      return;
    }

    this.data.emit(resultats);
  }

  fromCsvFileToArray(file: File) {
    return this.csvParser
      .parse(file, { header: true, delimiter: ';' })
      .pipe(
        tap(
          (data) => {
            return data;
          },
          (error) => console.log(error)
        )
      )
      .toPromise();
  }
}
