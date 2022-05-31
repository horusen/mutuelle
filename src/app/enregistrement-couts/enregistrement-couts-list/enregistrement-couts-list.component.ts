import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { EnregistrementCoutsService } from '../enregistrement-couts.service';

@Component({
  selector: 'app-enregistrement-couts-list',
  templateUrl: './enregistrement-couts-list.component.html',
  styleUrls: ['./enregistrement-couts-list.component.scss'],
})
export class EnregistrementCoutsListComponent
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
        title: 'Type',
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
          return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}
          `;
        },
      },
      cas_classique_cout_total: {
        title: 'Classique',
        editable: false,
        filter: false,
        sort: true,
        valuePrepareFunction: (cell: any) => {
          return this.helper.text.moneyFormat(+cell);
        },
      },
      cas_bsf_cout_total: {
        title: 'BSF',
        editable: false,
        filter: false,
        sort: true,
        valuePrepareFunction: (cell: any) => {
          return this.helper.text.moneyFormat(+cell);
        },
      },
      cas_cec_cout_total: {
        title: 'CEC',
        editable: false,
        filter: false,
        sort: true,
        valuePrepareFunction: (cell: any) => {
          return this.helper.text.moneyFormat(+cell);
        },
      },
      cas_eleve_cout_total: {
        title: 'Élève',
        editable: false,
        filter: false,
        sort: true,
        valuePrepareFunction: (cell: any) => {
          return this.helper.text.moneyFormat(+cell);
        },
      },
      cas_ndongo_daara_cout_total: {
        title: 'NdongoDaara',
        editable: false,
        filter: false,
        sort: true,
        valuePrepareFunction: (cell: any) => {
          return this.helper.text.moneyFormat(+cell);
        },
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

  constructor(public enregistrementCoutService: EnregistrementCoutsService) {
    super(enregistrementCoutService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.hideSidebar();
    this.enregistrementCoutService.data$.subscribe((data) => {
      this.tableDataSource = new LocalDataSource(data);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.enregistrementCoutService.get().subscribe(() => {
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
