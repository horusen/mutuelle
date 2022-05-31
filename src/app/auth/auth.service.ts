import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from 'src/shared/services/base.service';
import { Storage } from 'src/shared/storage/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  public user$ = new ReplaySubject<any>(1);
  constructor(public storage: Storage) {
    super('auth');
  }

  get user(): any {
    return { ...this.storage.getUser() };
  }

  resendEmailVerification(user: number): Observable<any> {
    return this.factory
      .get(`user/${user}/email/resend`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  logout() {
    return this.factory.post('auth/logout', {}).pipe(
      tap({
        next: () => {
          this.storage.clear();
        },
      })
    );
  }

  public login(elements: { email: string; password: string }): Observable<any> {
    return this.factory.post('auth/login', elements).pipe(
      tap({
        next: (response) => {
          this.storage.save(response);
          this.user$.next(this.user);
        },
      })
    );
  }

  public register(id: number, elements: any): Observable<any> {
    return this.factory.post(`auth/register/${id}`, elements).pipe(
      tap({
        next: (response) => {
          this.storage.save(response);
        },
      })
    );
  }

  checkUserInformation(params: Params): Observable<any> {
    return this.factory.get(`register/check`, { params });
  }

  isLoggedIn() {
    return this.storage.getAccessToken() && this.storage.getUser();
  }
}
