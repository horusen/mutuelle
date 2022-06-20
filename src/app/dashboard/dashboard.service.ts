import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/services/base.service';
import { ApiResponse } from './../../shared/models/ApiResponse';
import { DashboardData } from './dashboard-data.model';
import { tap, map } from 'rxjs/operators';
import { Helper } from 'src/shared/helper/helper';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
  constructor(public helper: Helper) {
    super('dashboard');
  }

  getData(date_debut?: string, date_fin?: string) {
    let params = this.helper.object.omitNullValue({ date_debut, date_fin });
    return this.factory.get(`${this.endPoint}`, {
      params: params,
    });
  }
}
