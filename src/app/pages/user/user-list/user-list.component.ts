import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public apiData: any = {};
  constructor(public apiservice: ApiserviceService) { }

  ngOnInit(): void {
    this.getuserList();
  }

  public getuserList(): void {
    this.apiservice
      .apigetcall('users', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.userData = resp;
        }
      });
  }

  public verifyUser(iamUserId: string): void {
    console.log(' this is the userId', iamUserId);
    this.apiservice.apipostcall(`iam/users/verify/${iamUserId}`, {})
    .subscribe(resp => {
      if ( resp){
        Swal.fire(
          'Verified!',
          'User has been verified.',
          'success'
        );
        this.getuserList();
      }
    });
  }

}
