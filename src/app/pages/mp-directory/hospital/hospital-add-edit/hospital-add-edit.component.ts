import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital-add-edit',
  templateUrl: './hospital-add-edit.component.html',
  styleUrls: ['./hospital-add-edit.component.scss']
})
export class HospitalAddEditComponent implements OnInit {
  public hospitalInfo: any = {
    socialMediaLinks: { }
  };

  public hospitalId = this.activeroute.snapshot.paramMap.get('hospitalId');

  constructor(  public router: Router, public apiservice: ApiserviceService, public activeroute: ActivatedRoute) { }

  ngOnInit(): void {

    console.log('hospitalId', this.hospitalId);
    if (this.hospitalId) {
      this._getHospitalById();
    }
  }

  public onClickSaveArticle(form){
    if (form.invalid) {
      return;
    }

    const payload: any = {
      name: this.hospitalInfo.name,
      description: this.hospitalInfo.description ? this.hospitalInfo.description : '',
      address: this.hospitalInfo.address ? this.hospitalInfo.address : '',
      latLong: '',
      contactNumber: this.hospitalInfo.contactNumber ? this.hospitalInfo.contactNumber : '',
      whatsAppNumber: this.hospitalInfo.whatsAppNumber ? this.hospitalInfo.whatsAppNumber : '',
      emailId: this.hospitalInfo.emailId ? this.hospitalInfo.emailId : null,
      website: this.hospitalInfo.website ? this.hospitalInfo.website : '',
      specialistIn: this.hospitalInfo.specialistIn ? this.hospitalInfo.specialistIn : '',
      twitterLink: this.hospitalInfo.twitterLink ? this.hospitalInfo.twitterLink : '',
      facebookLink: this.hospitalInfo.facebookLink ? this.hospitalInfo.facebookLink : '',
      instagramLink: this.hospitalInfo.instagramLink ? this.hospitalInfo.instagramLink : '',
      whatsAppLink: this.hospitalInfo.whatsAppLink ? this.hospitalInfo.whatsAppLink : '',
      hoursOfOperation: this.hospitalInfo.hoursOfOperation ? this.hospitalInfo.hoursOfOperation : ''
    };

    if (this.hospitalId){
      payload.isActive = true;
      this.apiservice
      .apiputcall(`hospitals/${this.hospitalId}`, payload)
      .subscribe(results => {
        Swal.fire(
          'Updated!',
          'Your Article has been Updated.',
          'success'
        );
        this.router.navigate(['/mpdirectory/hospital']);
      });
    }
    else{
      this.apiservice
      .apipostcall('hospitals', payload)
      .subscribe(results => {
        Swal.fire(
          'Added!',
          'Your Article has been Added.',
          'success'
        );
        this.router.navigate(['/mpdirectory/hospital']);
      });
    }
  }



  private _getHospitalById(): void {
    this.apiservice.apigetcall(`hospitals/${this.hospitalId}`, {}).subscribe(resp => {
      if (resp) {
       this.hospitalInfo = resp;
       console.log('hospital', this.hospitalInfo);
      }
    });
  }

}
