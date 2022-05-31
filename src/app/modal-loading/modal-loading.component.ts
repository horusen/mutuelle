import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Helper } from 'src/shared/helper/helper';
import { ModalLoadingService } from './modal-loading.service';
import { BaseComponent } from 'src/shared/base-component/base.component';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.scss'],
})
export class ModalLoadingComponent
  extends BaseComponent
  implements AfterViewInit
{
  modalName = 'modal-loading';
  constructor(
    public modalLoadingService: ModalLoadingService,
    public helper: Helper
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.subscriptions['show'] = this.modalLoadingService.show$.subscribe(
      () => {
        this.helper.modal.show(this.modalName);
      }
    );

    this.subscriptions['hide'] = this.modalLoadingService.hide$.subscribe(
      () => {
        this.helper.modal.hide(this.modalName);
      }
    );
  }
}
