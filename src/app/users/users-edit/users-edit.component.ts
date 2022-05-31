import { Component, OnInit } from '@angular/core';
import { UsersCreateComponent } from '../users-create/users-create.component';
import { UsersService } from '../users.service';
import { User } from './../users.model';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent extends UsersCreateComponent implements OnInit {
  single!: User;
  constructor(public userService: UsersService) {
    super(userService);
  }

  ngOnInit(): void {
    this.subscriptions['single'] = this.userService.singleData$.subscribe(
      (user) => {
        this.single = user;
        this.initialiseForm(user);
      }
    );
  }

  update() {
    if (this.form.valid) {
      this.loading = true;
      this.userService
        .update(this.single.id!, this.form.value)
        .subscribe(() => {
          this.loading = false;
          this.helper.notification.alertSuccess();
          this.edited.next();
        });
    } else {
      this.helper.notification.alertDanger('Formulaire invalide');
    }
  }
}
