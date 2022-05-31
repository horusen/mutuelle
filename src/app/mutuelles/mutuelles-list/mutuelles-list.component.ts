import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { MutuellesService } from './../../mutuelles.service';

@Component({
  selector: 'app-mutuelles-list',
  templateUrl: './mutuelles-list.component.html',
  styleUrls: ['./mutuelles-list.component.scss'],
})
export class MutuellesListComponent extends BaseComponent implements OnInit {
  tableDataSource!: LocalDataSource;

  tableConfiguration = {
    // hideSubHeader: true,
    add: {
      inputClass: 'form-control',
      addButtonContent: 'Ajouter',
    },
    columns: {
      libelle: {
        title: 'Libelle',
        editable: true,
        sort: true,
      },
      type: {
        title: 'Type de mutuelle de santé',
        valuePrepareFunction: (cell: any) => {
          return cell?.libelle;
        },
        filterFunction: (cell: any, b: any, c: any) => {
          let match = cell.libelle.toLowerCase().includes(b.toLowerCase());
          if (match || b === '') {
            return true;
          } else {
            return false;
          }
        },
        sort: true,
      },
      region: {
        title: 'Région',
        valuePrepareFunction: (cell: any, row: any) => {
          return cell?.libelle;
        },
        filterFunction: (cell: any, b: any, c: any) => {
          let match = cell.libelle.toLowerCase().includes(b.toLowerCase());
          if (match || b === '') {
            return true;
          } else {
            return false;
          }
        },
        sort: true,
      },
      departement: {
        title: 'Département',
        valuePrepareFunction: (cell: any) => {
          return cell?.libelle;
        },
        filterFunction: (cell: any, b: any, c: any) => {
          let match = cell.libelle.toLowerCase().includes(b.toLowerCase());
          if (match || b === '') {
            return true;
          } else {
            return false;
          }
        },
        sort: true,
      },

      commune: {
        title: 'Commune',
        valuePrepareFunction: (cell: any) => {
          return cell?.libelle;
        },
        filterFunction: (cell: any, b: any, c: any) => {
          let match = cell.libelle.toLowerCase().includes(b.toLowerCase());
          if (match || b === '') {
            return true;
          } else {
            return false;
          }
        },
        sort: true,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          type: 'html',
          title: '<a class="far fa-edit text-success" ></a>',
        },
        {
          name: 'delete',
          title: '<a class="far fa-trash   ml-2 text-danger"></a>',
        },
      ],
      position: 'right',
    },
  };

  @Output() tableEvent = new EventEmitter();

  constructor(public mutuelleService: MutuellesService) {
    super(mutuelleService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.tableDataSource = new LocalDataSource();
    this.mutuelleService.data$.subscribe((data) => {
      this.tableDataSource = new LocalDataSource(data);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.mutuelleService.get().subscribe((data) => {
      this.tableDataSource.load(this.mutuelleService.data);
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
