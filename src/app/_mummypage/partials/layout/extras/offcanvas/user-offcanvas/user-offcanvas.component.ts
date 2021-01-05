import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
import { ApiserviceService } from '../../../../../../modules/auth/_services/apiservice.service';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  // user$: Observable<UserModel>;
  userInfo;

  constructor(private layout: LayoutService, private auth: AuthService, private apiservice: ApiserviceService) {
    this.userInfo = this.apiservice.getuserinfo();
    console.log(this.userInfo);
  }

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    console.log(this.extrasUserOffcanvasDirection)
    // this.user$ = this.auth.currentUserSubject.asObservable();
  }

  logout() {
    this.apiservice.logout();
  }
}
