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
    },
    rowClassFunction: (row: any) => {
      console.log(row.data.email_verified_at);

      return row.data.email_verified_at ? 'hide-resend-email' : '';
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          type: 'html',
          title:
            '<a class="fas fa-edit ml-3 text-success" [ngbTooltip]="\'Modifier\'" ></a>',
        },
        {
          name: 'delete',
          title: '<a class="fas fa-trash   ml-3 text-danger"></a>',
        },
        {
          name: 'resend',
          type: 'html',
          title:
            '<a class="fas fa-envelope resend text-primary ml-3" [ngbTooltip]="\'Modifier\'" ></a>',
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
    this.userService.lastItemcreated$.subscribe((user) => {
      console.log(user);

      this.tableDataSource.empty();
      this.tableDataSource.refresh();
      this.tableDataSource.load(this.userService.data);
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
