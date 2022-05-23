import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MutuelleService } from '../mutuelle.service';

@Component({
  selector: 'app-mutuel-show',
  templateUrl: './mutuel-show.component.html',
  styleUrls: ['./mutuel-show.component.scss'],
})
export class MutuelShowComponent implements OnInit {
  constructor(
    public mutuelleService: MutuelleService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params.id);

      this.mutuelleService.getMututelle(+params.id - 1);
      console.log(this.mutuelleService.single);

      // if (!this.mutuelleService.single) {
      //   this.router.navigate(['/']);
      // }
    });
  }
}
