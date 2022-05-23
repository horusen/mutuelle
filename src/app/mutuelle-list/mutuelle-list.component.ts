import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mutuelle-list',
  templateUrl: './mutuelle-list.component.html',
  styleUrls: ['./mutuelle-list.component.scss'],
})
export class MutuelleListComponent implements OnInit {
  data: any[] = [];
  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      region: {
        title: 'Full Name',
      },
      departement: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
