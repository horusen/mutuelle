import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/users/users.model';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent
  extends BaseContainerComponent<User>
  implements OnInit
{
  constructor(
    public userService: UsersService,
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {
    super(userService, router, route, 'users');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
      this.router.navigate(['./'], {
        fragment: 'edit-users',
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    } else if (event.action == 'resend') {
      this.authService.resendEmailVerification(event.data.id).subscribe(() => {
        this.helper.notification.alertSuccess();
      });
    }
  }

  modifer(user: User) {
    this.userService.singleData = user;
  }
}
