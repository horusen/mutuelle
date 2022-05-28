import { Component, OnInit } from '@angular/core';
import { BaseCreateComponent } from 'src/shared/base-component/base-create.component';
import { User } from 'src/app/users/users.model';
import { UsersService } from '../users.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss'],
})
export class UsersCreateComponent
  extends BaseCreateComponent<User>
  implements OnInit
{
  constructor(public userService: UsersService) {
    super(userService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
    });
  }

  create() {
    this.loading = true;
    this.userService.store(this.form.value).subscribe(() => {
      this.loading = false;
      this.helper.notification.alertSuccess();
      this.form.reset();
    });
  }
}
