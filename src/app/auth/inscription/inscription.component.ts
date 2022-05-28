import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/users/users.model';
import { UsersService } from 'src/app/users/users.service';
import { BaseCreateComponent } from 'src/shared/base-component/base-create.component';
import { AuthService } from '../auth.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent
  extends BaseCreateComponent<User>
  implements OnInit
{
  loading = false;
  single!: User;

  constructor(
    public route: ActivatedRoute,
    public userService: UsersService,
    public authService: AuthService,
    public router: Router
  ) {
    super(userService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) =>
      this._checkRegistrationInformation(params)
    );
  }

  private _checkRegistrationInformation(params: Params) {
    this.loading = true;
    this.authService.checkUserInformation(params).subscribe(
      (response) => {
        this.userService.singleData = response;
        this.single = response;
        this.form = this.fb.group({
          name: [this.single.name, Validators.required],
          email: [this.single.email, Validators.required],
          password: [null, Validators.required],
          password_confirmation: [null, Validators.required],
        });
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status == 403) {
          this.router.navigate(['bad-url']);
        }
      }
    );
  }

  register() {
    this.loading = true;
    this.authService
      .register(this.single.id!, this.form.value)
      .subscribe(() => {
        this.loading = false;
        this.router.navigate(['./']);
      });
  }
}
