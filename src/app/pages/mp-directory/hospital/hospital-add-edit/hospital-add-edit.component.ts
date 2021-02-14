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
  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];
  public featuredImages: any = '';
  public articleImages: any[] = [];
  public featuredImagesLabel: any = 'Choose featuredImage';
  public articleImagesLabel: any = 'Choose Article Images (Max 10)';
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
    const formData = new FormData();
    formData.append('name', this.hospitalInfo.name);
    formData.append('description', this.hospitalInfo.description? this.hospitalInfo.description : '');
    formData.append('address', this.hospitalInfo.address ? this.hospitalInfo.address : '');
    formData.append('images', this.featuredImages);
    formData.append('contactNumber', this.hospitalInfo.contactNumber ? this.hospitalInfo.contactNumber : '');
    formData.append('whatsAppNumber', this.hospitalInfo.whatsAppNumber ? this.hospitalInfo.whatsAppNumber : '');
    formData.append('emailId', this.hospitalInfo.emailId ? this.hospitalInfo.emailId : null);
    formData.append('website', this.hospitalInfo.website ? this.hospitalInfo.website : '');
    formData.append('specialistIn', this.hospitalInfo.specialistIn ? this.hospitalInfo.specialistIn : '');
    formData.append('twitterLink', this.hospitalInfo.twitterLink ? this.hospitalInfo.twitterLink : '');
    formData.append('facebookLink', this.hospitalInfo.facebookLink ? this.hospitalInfo.facebookLink : '');
    formData.append('instagramLink', this.hospitalInfo.instagramLink ? this.hospitalInfo.instagramLink : '');
    formData.append('whatsAppLink', this.hospitalInfo.whatsAppLink ? this.hospitalInfo.whatsAppLink : '');
    formData.append('hoursOfOperation', this.hospitalInfo.hoursOfOperation ? this.hospitalInfo.hoursOfOperation : '');

    if (this.hospitalId){
     // payload.isActive = true;
      debugger;
    //  console.log(payload)
      this.apiservice
      .apiputcall(`hospitals/${this.hospitalId}`, formData)
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
      debugger;
      console.log(formData)
      this.apiservice
      .apipostcall('hospitals', formData)
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
  
  private _getHospitalById(): void {
    this.apiservice.apigetcall(`hospitals/${this.hospitalId}`, {}).subscribe(resp => {
      if (resp) {
       this.hospitalInfo = resp;
       console.log('hospital', this.hospitalInfo);
      }
    });
  }

}
