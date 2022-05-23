import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mutuelle-list',
  templateUrl: './mutuelle-list.component.html',
  styleUrls: ['./mutuelle-list.component.scss'],
})
export class MutuelleListComponent implements OnInit {
  data: any[] = [];
  // settings = {
  //   columns: {

  //     region: {
  //       title: 'Région',
  //       titleField:[0].libelle
  //     },
  //     departement: {
  //       title: 'Département',
  //     },
  //     commune: {
  //       title: 'Commune',
  //     },
  //     mutuelle: {
  //       title: 'Mutuelle de santé',
  //     },
  //     action: {
  //       title: 'Action',
  //     },
  //   },
  // };
  constructor() {}

  ngOnInit(): void {
    let unparsedData = localStorage.getItem('mutuelles');
    this.data = unparsedData ? JSON.parse(unparsedData).reverse() : [];
  }
}
