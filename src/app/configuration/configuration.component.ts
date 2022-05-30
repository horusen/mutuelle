import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/shared/base-component/base.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.showSidebar();
  }
}
