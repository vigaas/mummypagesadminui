import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  public apiData: any = {};
  constructor(public apiservice: ApiserviceService,
    ) { }

  ngOnInit(): void {
    this._getDashboardCount();
  }

  private _getDashboardCount(): void {
    this.apiservice
      .apigetcall('dashboard/get-stats', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.count = resp;
        }
      });
  }

}
