import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { TypePrestation } from './../type-prestations.model';
import { TypePrestationsService } from '../type-prestations.service';

@Component({
  selector: 'app-type-prestations-list',
  templateUrl: './type-prestations-list.component.html',
  styleUrls: ['./type-prestations-list.component.scss'],
})
export class TypePrestationsListComponent
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
      // id: {
      //   title: 'ID',
      //   editable: false,
      // },
      libelle: {
        title: 'Libelle',
        editable: true,
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

  constructor(public typePrestationService: TypePrestationsService) {
    super(typePrestationService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.tableDataSource = new LocalDataSource();
    this.typePrestationService.lastItemcreated$.subscribe((typePrestation) => {
      console.log(typePrestation);

      this.tableDataSource.empty();
      this.tableDataSource.refresh();
      this.tableDataSource.load(this.typePrestationService.data);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.typePrestationService.get().subscribe(() => {
      this.tableDataSource.load(this.typePrestationService.data);
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
