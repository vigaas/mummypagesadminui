import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
