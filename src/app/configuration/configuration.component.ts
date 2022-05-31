import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/shared/base-component/base.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent extends BaseComponent implements OnInit {
  constructor(public authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.showSidebar();
  }
}
