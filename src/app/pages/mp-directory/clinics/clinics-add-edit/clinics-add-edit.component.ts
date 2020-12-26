import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clinics-add-edit',
  templateUrl: './clinics-add-edit.component.html',
  styleUrls: ['./clinics-add-edit.component.scss']
})
export class ClinicsAddEditComponent implements OnInit {

  public clinicInfo: any = {
    socialMediaLinks: { }
  };

  public clinicsId = this.activeroute.snapshot.paramMap.get('clinicsId');
  constructor(public router: Router,  public apiservice: ApiserviceService, public activeroute: ActivatedRoute, ) { }


  ngOnInit(): void {
    if (this.clinicsId){
      this._getClinicById();
    }
  }

  public onClickSaveClinics(form){
    if (form.invalid) {
      return;
    }

    const payload: any = {
      organizationName: this.clinicInfo.organizationName,
      description: this.clinicInfo.description ? this.clinicInfo.description : '',
      doctorName: this.clinicInfo.doctorName ? this.clinicInfo.doctorName : '',
      address: this.clinicInfo.address ? this.clinicInfo.address : '',
      latLong: '',
      contactNumber: this.clinicInfo.contactNumber ? this.clinicInfo.contactNumber : '',
      whatsAppNumber: this.clinicInfo.whatsAppNumber ? this.clinicInfo.whatsAppNumber : '',
      emailId: this.clinicInfo.emailId ? this.clinicInfo.emailId : null,
      website: this.clinicInfo.website ? this.clinicInfo.website : '',
      twitterLink: this.clinicInfo.twitterLink ? this.clinicInfo.socialMediaLinks.twitter : '',
      facebookLink: this.clinicInfo.facebookLink ? this.clinicInfo.socialMediaLinks.facebook : '',
      instagramLink: this.clinicInfo.instagramLink ? this.clinicInfo.socialMediaLinks.instagram : '',
      whatsAppLink: this.clinicInfo.whatsAppLink ? this.clinicInfo.socialMediaLinks.whatsApp : '',
      hoursOfOperation: this.clinicInfo.hoursOfOperation ? this.clinicInfo.hoursOfOperation : '',
      specialistIn: this.clinicInfo.specialistIn ? this.clinicInfo.specialistIn : ''
    };

    if (this.clinicsId){
      payload.isActive = true;
      this.apiservice
      .apiputcall(`clinics/${this.clinicsId}`, payload)
      .subscribe(results => {
        Swal.fire(
          'Updated!',
          'Your Article has been Updated.',
          'success'
        );
        this.router.navigate(['/mpdirectory/clinics']);
      });
    }
    else{
      this.apiservice
      .apipostcall('clinics', payload)
      .subscribe(results => {
        Swal.fire(
          'Added!',
          'Your Article has been Added.',
          'success'
        );
        this.router.navigate(['/mpdirectory/clinics']);
      });
    }
  }

  private _getClinicById(): void {
    this.apiservice.apigetcall(`clinics/${this.clinicsId}`, {}).subscribe(resp => {
      if (resp) {
       this.clinicInfo = resp;
       console.log('clinics', this.clinicInfo);
      }
    });
  }

}
