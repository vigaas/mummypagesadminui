import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacies-add-edit',
  templateUrl: './pharmacies-add-edit.component.html',
  styleUrls: ['./pharmacies-add-edit.component.scss']
})
export class PharmaciesAddEditComponent implements OnInit {

  public pharmaciesInfo: any = {
    socialMediaLinks: { }
  };
  public pharmaciesId = this.activeroute.snapshot.paramMap.get('pharmaciesId');
  constructor(public router: Router,  public apiservice: ApiserviceService, public activeroute: ActivatedRoute, ) { }

  ngOnInit(): void {
    if (this.pharmaciesId){
      this._getPharmaciesId();
    }
  }

  public onClickSavePharmacies(form){
    if (form.invalid) {
      return;
    }

    const payload: any = {
      name: this.pharmaciesInfo.name,
      pharmacist: this.pharmaciesInfo.pharmacist ? this.pharmaciesInfo.pharmacist : '',
      certificate: this.pharmaciesInfo.certificate ? this.pharmaciesInfo.certificate : '',
      address: this.pharmaciesInfo.address ? this.pharmaciesInfo.address : '',
      latLong: '',
      contactNumber: this.pharmaciesInfo.contactNumber ? this.pharmaciesInfo.contactNumber : '',
      whatsAppNumber: this.pharmaciesInfo.whatsAppNumber ? this.pharmaciesInfo.whatsAppNumber : '',
      emailId: this.pharmaciesInfo.emailId ? this.pharmaciesInfo.emailId : null,
      website: this.pharmaciesInfo.website ? this.pharmaciesInfo.website : '',
      twitterLink: this.pharmaciesInfo.twitterLink ? this.pharmaciesInfo.twitterLink : '',
      facebookLink: this.pharmaciesInfo.facebookLink ? this.pharmaciesInfo.facebookLink : '',
      instagramLink: this.pharmaciesInfo.instagramLink ? this.pharmaciesInfo.instagramLink : '',
      whatsAppLink: this.pharmaciesInfo.whatsAppLink ? this.pharmaciesInfo.whatsAppLink : '',
      hoursOfOperation: this.pharmaciesInfo.hoursOfOperation ? this.pharmaciesInfo.hoursOfOperation : ''
    };

    if (this.pharmaciesId){
      payload.isActive = true;
      this.apiservice
      .apiputcall(`pharmacies/${this.pharmaciesId}`, payload)
      .subscribe(results => {
        Swal.fire(
          'Updated!',
          'Your Article has been Updated.',
          'success'
        );
        this.router.navigate(['/mpdirectory/pharmacies']);
      });
    }
    else{
      this.apiservice
      .apipostcall('pharmacies', payload)
      .subscribe(results => {
        Swal.fire(
          'Added!',
          'Your Article has been Added.',
          'success'
        );
        this.router.navigate(['/mpdirectory/pharmacies']);
      });
    }
  }


  private _getPharmaciesId(): void {
    this.apiservice.apigetcall(`pharmacies/${this.pharmaciesId}`, {}).subscribe(resp => {
      if (resp) {
       this.pharmaciesInfo = resp;
       console.log('pharmacies', this.pharmaciesInfo);
      }
    });
  }

}
