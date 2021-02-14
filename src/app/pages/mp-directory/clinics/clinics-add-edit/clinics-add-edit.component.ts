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
  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];
  public featuredImages: any = '';
  public articleImages: any[] = [];
  public featuredImagesLabel: any = 'Choose featuredImage';
  public articleImagesLabel: any = 'Choose Article Images (Max 10)';
  public clinicsId = this.activeroute.snapshot.paramMap.get('clinicsId');
  constructor(public router: Router,  public apiservice: ApiserviceService, public activeroute: ActivatedRoute, ) { }


  ngOnInit(): void {
    if (this.clinicsId){
      this._getClinicById();
    }
  }

  public onChangeThumbnailFile(files: FileList): void {
    const fileReader = new FileReader();
    const imageLabel = document.getElementById('featuredImages');

    if (files && files.length > 0) {
      const thumbnailFile = files.item(0);
      const thumbnailFileType: string = thumbnailFile.name.split('.').pop();

      if (this.supportedImageFiles.includes(`.${thumbnailFileType}`)) {
        fileReader.readAsText(thumbnailFile);
        fileReader.onload = (event: any) => {
          const file = files.item(0);
          this.featuredImages = file;
          imageLabel.textContent = file.name;
        };
      } else {
        const fileFormatError = `Only ${this.supportedImageFiles.join(
          ', '
        )} file is allowed`;
        Swal.fire('Alert!', fileFormatError, 'warning');
        this.featuredImages = '';
        imageLabel.textContent = this.featuredImagesLabel;
      }
    }
  }

  public onClickSaveClinics(form){
    if (form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('organizationName', this.clinicInfo.organizationName,);
    formData.append('description', this.clinicInfo.description ? this.clinicInfo.description : '');
    formData.append('doctorName', this.clinicInfo.doctorName ? this.clinicInfo.doctorName : '',);
    formData.append('images', this.featuredImages);
    formData.append('contactNumber', this.clinicInfo.contactNumber ? this.clinicInfo.contactNumber : '');
    formData.append('whatsAppNumber', this.clinicInfo.whatsAppNumber ? this.clinicInfo.whatsAppNumber : '');
    formData.append('emailId', this.clinicInfo.emailId ? this.clinicInfo.emailId : null,);
    formData.append('website', this.clinicInfo.website ? this.clinicInfo.website : '');
    formData.append('specialistIn', this.clinicInfo.specialistIn ? this.clinicInfo.specialistIn : '');
    formData.append('twitterLink', this.clinicInfo.twitterLink ? this.clinicInfo.twitterLink : '');
    formData.append('facebookLink', this.clinicInfo.facebookLink ? this.clinicInfo.facebookLink : '');
    formData.append('instagramLink', this.clinicInfo.instagramLink ? this.clinicInfo.instagramLink : '');
    formData.append('whatsAppLink', this.clinicInfo.whatsAppLink ? this.clinicInfo.whatsAppLink : '');
    formData.append('hoursOfOperation', this.clinicInfo.hoursOfOperation ? this.clinicInfo.hoursOfOperation : '');
 

    if (this.clinicsId){
     // payload.isActive = true;
      this.apiservice
      .apiputcall(`clinics/${this.clinicsId}`, formData)
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
      .apipostcall('clinics', formData)
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
