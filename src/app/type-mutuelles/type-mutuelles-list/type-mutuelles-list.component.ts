import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { TypeMutuelle } from '../type-mutuelles.model';
import { TypeMutuellesService } from '../type-mutuelles.service';

@Component({
  selector: 'app-type-mutuelles-list',
  templateUrl: './type-mutuelles-list.component.html',
  styleUrls: ['./type-mutuelles-list.component.scss'],
})
export class TypeMutuellesListComponent
  extends BaseComponent<TypeMutuelle>
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

  constructor(public typeMutuelleService: TypeMutuellesService) {
    super(typeMutuelleService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.tableDataSource = new LocalDataSource();
    this.typeMutuelleService.data$.subscribe((data) => {
      this.tableDataSource = new LocalDataSource(data);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.typeMutuelleService.get().subscribe(() => {
      this.tableDataSource.load(this.typeMutuelleService.data);
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
