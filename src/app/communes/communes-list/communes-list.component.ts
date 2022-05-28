import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Commune } from '../commune.model';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { CommuneService } from '../commune.service';

@Component({
  selector: 'app-communes-list',
  templateUrl: './communes-list.component.html',
  styleUrls: ['./communes-list.component.scss'],
})
export class CommunesListComponent
  extends BaseComponent<Commune>
  implements OnInit
{
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
      departement: {
        title: 'Département',
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

  constructor(public communeService: CommuneService) {
    super(communeService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.tableDataSource = new LocalDataSource();
    this.communeService.lastItemcreated$.subscribe((commune) => {
      this.tableDataSource.empty();
      this.tableDataSource.refresh();
      this.tableDataSource.load(this.communeService.data);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.communeService.get().subscribe(() => {
      this.tableDataSource.load(this.communeService.data);
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
