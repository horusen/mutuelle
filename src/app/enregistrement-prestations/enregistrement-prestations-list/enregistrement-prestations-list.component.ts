import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { EnregistrementPrestationsService } from '../enregistrement-prestations.service';

@Component({
  selector: 'app-enregistrement-prestations-list',
  templateUrl: './enregistrement-prestations-list.component.html',
  styleUrls: ['./enregistrement-prestations-list.component.scss'],
})
export class EnregistrementPrestationsListComponent
  extends BaseComponent
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

      mutuelle: {
        title: 'Mutuelle',
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
      type: {
        title: 'Type de mutuelle',
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
      type_prestation: {
        title: 'Type de prestation',
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
      date: {
        title: 'Date',
        editable: false,
        filter: true,
        sort: true,
        valuePrepareFunction: (cell: any) => {
          const date = new Date(cell);
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
          `;
        },
      },
      cas_classique_nombre_total: {
        title: 'Classique',
        editable: false,
        filter: false,
        sort: true,
      },
      cas_bsf_nombre_total: {
        title: 'BSF',
        editable: false,
        filter: false,
        sort: true,
      },
      cas_cec_nombre_total: {
        title: 'CEC',
        editable: false,
        filter: false,
        sort: true,
      },
      cas_eleve_nombre_total: {
        title: 'Élève',
        editable: false,
        filter: false,
        sort: true,
      },
      cas_ndongo_daara_nombre_total: {
        title: 'NdongoDaara',
        editable: false,
        filter: false,
        sort: true,
      },
    },
    actions: {
      columnTitle: 'Actionner',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'show',
          type: 'html',
          title: '<div class="far fa-eye mr-2 text-primary" ></div>',
        },
        {
          name: 'edit',
          type: 'html',
          title: '<div class="far fa-edit mr-2 text-success" ></div>',
        },
        {
          name: 'delete',
          title: '<div class="far fa-trash   text-danger"></div>',
        },
      ],
      position: 'left',
    },
  };

  @Output() tableEvent = new EventEmitter();

  constructor(
    public enregistrementPrestationService: EnregistrementPrestationsService
  ) {
    super(enregistrementPrestationService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.hideSidebar();
    this.tableDataSource = new LocalDataSource();
    this.enregistrementPrestationService.data$.subscribe((data) => {
      this.tableDataSource = new LocalDataSource(data);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.enregistrementPrestationService.get().subscribe((data) => {
      this.tableDataSource.load(this.enregistrementPrestationService.data);
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
