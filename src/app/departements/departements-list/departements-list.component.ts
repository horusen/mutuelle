import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { DepartementService } from '../departement.service';

@Component({
  selector: 'app-departements-list',
  templateUrl: './departements-list.component.html',
  styleUrls: ['./departements-list.component.scss'],
})
export class DepartementsListComponent extends BaseComponent implements OnInit {
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
      region: {
        title: 'Région',
        valuePrepareFunction: (cell: any) => {
          return cell.libelle;
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
          title: '<a class="fas fa-edit text-success" ></a>',
        },
        {
          name: 'delete',
          title: '<a class="fas fa-trash   ml-2 text-danger"></a>',
        },
      ],
      position: 'right',
    },
  };

  @Output() tableEvent = new EventEmitter();

  constructor(public departementService: DepartementService) {
    super(departementService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.tableDataSource = new LocalDataSource();
    this.departementService.lastItemcreated$.subscribe((departement) => {
      console.log(departement);

      this.tableDataSource.empty();
      this.tableDataSource.refresh();
      this.tableDataSource.load(this.departementService.data);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.departementService.get().subscribe(() => {
      this.tableDataSource.load(this.departementService.data);
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
