import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unamusc',
  templateUrl: './unamusc.component.html',
  styleUrls: ['./unamusc.component.scss'],
})
export class UnamuscComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}
  deconnexion() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/authentification/connexion']);
    });
  }
}
