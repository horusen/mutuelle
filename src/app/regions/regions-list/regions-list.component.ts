import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html',
  styleUrls: ['./regions-list.component.scss'],
})
export class RegionsListComponent extends BaseComponent implements OnInit {
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

  constructor(public regionService: RegionService) {
    super(regionService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.tableDataSource = new LocalDataSource();
    this.regionService.lastItemcreated$.subscribe((region) => {
      console.log(region);

      this.tableDataSource.empty();
      this.tableDataSource.refresh();
      this.tableDataSource.load(this.regionService.data);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.regionService.get().subscribe(() => {
      this.tableDataSource.load(this.regionService.data);
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
