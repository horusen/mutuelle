import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Helper } from '../helper/helper';
import { AppInjector } from '../injector/app-injector.service';
import { BaseService } from '../services/base.service';

declare var $: any;

interface Subscriptions {
  [k: string]: Subscription;
}

@Component({
  selector: '',
  template: '',
  styles: [],
})
export abstract class BaseComponent<T = any> implements OnDestroy {
  public currentPage = 1; // Pour la pagination
  public loading = false;
  public data: T[] = [];
  public subscriptions: Subscriptions = {};

  public helper: Helper;
  // public auth: AuthService = null;

  constructor(public service?: BaseService) {
    this.helper = AppInjector.injector.get(Helper);
    // this.auth = AppInjector.injector.get(AuthService);
  }

  /* ONDESTROY */
  ngOnDestroy(): void {
    this.unsubscribe(this.subscriptions);
  }

  hideSidebar() {
    $('body').addClass('sidebar-toggled');
    $('.sidebar').addClass('toggled');
    $('.sidebar .collapse').collapse('hide');
  }

  showSidebar() {
    $('body').removeClass('sidebar-toggled');
    $('.sidebar').removeClass('toggled');
  }

  toggleSidebar(): void {
    $('body').toggleClass('sidebar-toggled');
    $('.sidebar').toggleClass('toggled');
    if ($('.sidebar').hasClass('toggled')) {
      $('.sidebar .collapse').collapse('hide');
    }
  }

  unsubscribe(subscriptions: Subscriptions) {
    Object.keys(subscriptions).forEach((key) => {
      subscriptions[key].unsubscribe();
    });
  }

  supprimer(item: T & { id?: number }) {
    this.helper.notification.confirm(() => {
      this.loading = true;

      this.service?.delete(item.id!).subscribe(() => {
        this.loading = false;
        this.helper.notification.alertSuccess();
      });
    });
  }
}
