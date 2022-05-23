import { Component, OnInit } from '@angular/core';
import { RecapitulatifService } from '../recapitulatif.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.component.html',
  styleUrls: ['./recapitulatif.component.scss'],
})
export class RecapitulatifComponent implements OnInit {
  constructor(
    public recapService: RecapitulatifService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  saveMutuelle() {
    let unparsedMutuelles = localStorage.getItem('mutuelles');

    let mutuelles = unparsedMutuelles ? JSON.parse(unparsedMutuelles) : [];
    mutuelles.push(this.recapService.recap);
    localStorage.setItem('mutuelles', JSON.stringify(mutuelles));
    this.router.navigate(['./']);
  }
}
