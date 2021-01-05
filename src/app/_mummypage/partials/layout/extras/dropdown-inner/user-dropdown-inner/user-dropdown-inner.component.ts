import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { ApiserviceService } from '../../../../../../modules/auth/_services/apiservice.service';
import { AuthService } from '../../../../../../modules/auth';
@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  userInfo;

  constructor(private layout: LayoutService, private auth: AuthService, private apiservice: ApiserviceService) {}

  ngOnInit(): void {
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
    this.userInfo = this.apiservice.getuserinfo();
  }

  logout() {
    this.apiservice.logout();
  }
}
