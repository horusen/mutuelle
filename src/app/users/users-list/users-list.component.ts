import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends BaseComponent implements OnInit {
  tableDataSource!: LocalDataSource;

  tableConfiguration = {
    // hideSubHeader: true,
    add: {
      inputClass: 'form-control',
      addButtonContent: 'Ajouter',
    },
    columns: {
      name: {
        title: 'Nom',
        editable: true,
        sort: true,
      },
      email: {
        title: 'Addresse email',
        editable: true,
        sort: true,
      },
      etat: {
        title: 'Etat',
        sort: true,
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
      },
    },
    rowClassFunction: (row: any) => {
      let className = '';

      if (row.data.etat.id == 1)
        className += 'hide-activate-button hide-desactivate-button';
      else if (row.data.etat.id == 2)
        className +=
          'hide-resend-email-button hide-edit-button hide-activate-button';
      else if (row.data.etat.id == 3)
        className +=
          'hide-desactivate-button hide-resend-email-button hide-edit-button';

      return className;
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          type: 'html',
          title: '<a class="far fa-edit edit ml-3 text-success"  ></a>',
        },

        {
          name: 'resend',
          type: 'html',
          title: '<a class="far fa-envelope resend text-primary ml-3"  ></a>',
        },
        {
          name: 'unblock',
          type: 'html',
          title:
            '<a class="far fa-badge-check activate text-primary ml-3" ></a>',
        },
        {
          name: 'block',
          type: 'html',
          title:
            '<a class="far fa-ban desactivate text-secondary ml-3" " ></a>',
        },
        {
          name: 'delete',
          title: '<a class="far fa-trash   ml-3 text-danger"></a>',
        },
      ],
      position: 'right',
    },
  };

  @Output() tableEvent = new EventEmitter();

  constructor(public userService: UsersService) {
    super(userService);
  }

  // TODO: Corriger la reactualisation du tableau
  ngOnInit(): void {
    this.tableDataSource = new LocalDataSource();
    this.userService.data$.subscribe((data) => {
      this.tableDataSource = new LocalDataSource(data);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.userService.get().subscribe(() => {
      this.tableDataSource.load(this.userService.data);
      this.loading = false;
    });
  }

  onCustomTriggered(event: any) {
    this.tableEvent.emit(event);
  }
}
