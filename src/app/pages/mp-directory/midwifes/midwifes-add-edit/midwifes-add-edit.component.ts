import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-midwifes-add-edit',
  templateUrl: './midwifes-add-edit.component.html',
  styleUrls: ['./midwifes-add-edit.component.scss']
})
export class MidwifesAddEditComponent implements OnInit {
  public midWifesInfo: any = {};
  public midwifesId = this.activeroute.snapshot.paramMap.get('midwifesId');
  constructor(public router: Router,  public apiservice: ApiserviceService, public activeroute: ActivatedRoute, ) { }

  ngOnInit(): void {
    if (this.midwifesId){
      this._getMidWifeById();
    }
  }

  public onClickSaveMidWifes(form){
    if (form.invalid) {
      return;
    }

    const payload: any = {
      name: this.midWifesInfo.name,
      address: this.midWifesInfo.address ? this.midWifesInfo.address : '',
      latLong: '',
      contactNumber: this.midWifesInfo.contactNumber ? this.midWifesInfo.contactNumber : '',
      emailId: this.midWifesInfo.emailId ? this.midWifesInfo.emailId : null,
      whatsAppNumber: this.midWifesInfo.whatsAppNumber ? this.midWifesInfo.whatsAppNumber : ''
    };

    if (this.midwifesId){
      payload.isActive = true ;
      this.apiservice
      .apiputcall(`midwifes/${this.midwifesId}`, payload)
      .subscribe(results => {
        Swal.fire(
          'Updated!',
          'Your Article has been Updated.',
          'success'
        );
        this.router.navigate(['/mpdirectory/midwifes']);
      });
    }
    else{
      this.apiservice
      .apipostcall('midwifes', payload)
      .subscribe(results => {
        Swal.fire(
          'Added!',
          'Your Article has been Added.',
          'success'
        );
        this.router.navigate(['/mpdirectory/midwifes']);
      });
    }
  }

  private _getMidWifeById(): void {
    this.apiservice.apigetcall(`midwifes/${this.midwifesId}`, {}).subscribe(resp => {
      if (resp) {
       this.midWifesInfo = resp;
       console.log('hospital', this.midWifesInfo);
      }
    });
  }
}
