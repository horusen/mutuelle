import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/users/users.model';
import { BaseContainerComponent } from 'src/shared/base-component/base-container.component';
import { AuthService } from '../auth/auth.service';
import { ModalLoadingService } from '../modal-loading/modal-loading.service';
import { UsersService } from './users.service';
import { PageBadUrlComponent } from './../page-bad-url/page-bad-url.component';

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
    public authService: AuthService,
    public modalLoadingService: ModalLoadingService
  ) {
    super(userService, router, route, 'users');
  }

  onTableEvent(event: any) {
    if (event.action == 'edit') {
      this.modifer(event.data);
    } else if (event.action == 'delete') {
      this.supprimer(event.data);
    } else if (event.action == 'resend') {
      this.resendEmailVerification(event.data.id);
    } else if (event.action == 'block') {
      this.block(event.data);
    } else if (event.action == 'unblock') {
      this.unblock(event.data);
    }
  }

  modifer(user: User) {
    this.userService.singleData = user;
    this.router.navigate(['./'], {
      fragment: 'edit-users',
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }

  resendEmailVerification(userId: number) {
    this.modalLoadingService.show(
      'En attente du renvoie du message de validation'
    );
    this.authService.resendEmailVerification(userId).subscribe(
      () => {
        this.modalLoadingService.hide();
        this.helper.notification.alertSuccess();
      },
      () => {
        this.modalLoadingService.hide();
      }
    );
  }

  block(user: User) {
    this.changeEtat(user, 3, `Blocage de l'accés à ${user.name}`);
  }

  unblock(user: User) {
    this.changeEtat(user, 2, `Autorisation de l'accés à ${user.name}`);
  }

  changeEtat(user: User, etat: 2 | 3, message: string) {
    this.helper.notification.confirm(() => {
      this.modalLoadingService.show(message);
      this.userService.update(user.id!, { ...user, etat }).subscribe(() => {
        this.modalLoadingService.hide();
        this.helper.notification.alertSuccess();
      });
    });
  }
}
