import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { EnregistrementBeneficiairesService } from './../enregistrement-beneficiaires.service';
import { EnregistrementBeneficiaire } from './../enregistrement-beneficiaires.model';

@Component({
  selector: 'app-enregistrement-beneficiaires-list',
  templateUrl: './enregistrement-beneficiaires-list.component.html',
  styleUrls: ['./enregistrement-beneficiaires-list.component.scss'],
})
export class EnregistrementBeneficiairesListComponent
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
      commune: {
        title: 'Commune',
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

      mutuelle: {
        title: 'Mutuelle',
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
      type: {
        title: 'Type',
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
      nombre_adherent: {
        title: "Nombre d'adherent",
        editable: false,
        filter: false,
        sort: true,
      },
      nombre_beneficiaire: {
        title: 'Nombre de bénéficiaire',
        editable: false,
        filter: false,
        sort: true,
      },
      nombre_beneficiaire_a_jour: {
        title: 'Nombre de bénéficiaire à jour',
        editable: false,
        filter: false,
        sort: true,
      },
      dette_etat: {
        title: "Dette de l'etat",
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
          title: '<div class="fas fa-eye mr-2 text-primary" ></div>',
        },
        {
          name: 'edit',
          type: 'html',
          title: '<div class="fas fa-edit mr-2 text-success" ></div>',
        },
        {
          name: 'delete',
          title: '<div class="fas fa-trash   text-danger"></div>',
        },
      ],
      position: 'left',
    },
  };

  @Output() tableEvent = new EventEmitter();

  constructor(
    public enregistrementService: EnregistrementBeneficiairesService
  ) {
    super(enregistrementService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.hideSidebar();
    this.tableDataSource = new LocalDataSource();
    this.enregistrementService.lastItemcreated$.subscribe(
      (enregistrementCout) => {
        console.log(enregistrementCout);

        this.tableDataSource.empty();
        this.tableDataSource.refresh();
        this.tableDataSource.load(this.enregistrementService.data);
      }
    );
    this.getData();
  }

  getData() {
    this.loading = true;
    this.enregistrementService.get().subscribe((data) => {
      this.tableDataSource.load(this.enregistrementService.data);
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
