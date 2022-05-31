import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseCreateComponent } from 'src/shared/base-component/base-create.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent extends BaseCreateComponent implements OnInit {
  constructor(public authService: AuthService) {
    super(authService);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  markFormAsInvalid(): void {
    this.form.controls.email.markAsUntouched();

    this.form.controls.password.setErrors({ password: true });

    this.form.controls.password.patchValue('');
  }

  login() {
    this.loading = true;
    this.authService.login(this.form.value).subscribe(
      () => {
        this.helper.navigation.navigate(['/']);
        this.helper.notification.toastSuccess('Bienvenue');
        this.loading = false;
      },
      (error) => {
        // if (error.status === 401) {
        this.helper.notification.toastDanger(error.error.message);
        this.markFormAsInvalid();
        this.loading = false;
        // }
      }
    );
  }
}
