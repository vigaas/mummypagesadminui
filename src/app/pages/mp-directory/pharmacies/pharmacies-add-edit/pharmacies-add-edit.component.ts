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
  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];
  public featuredImages: any = '';
  public articleImages: any[] = [];
  public featuredImagesLabel: any = 'Choose featuredImage';
  public articleImagesLabel: any = 'Choose Article Images (Max 10)';
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

  public onClickSavePharmacies(form){
    if (form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.pharmaciesInfo.name);
    formData.append('pharmacist', this.pharmaciesInfo.pharmacist ? this.pharmaciesInfo.pharmacist : '');
    formData.append('latLong', '');
    formData.append('images', this.featuredImages);
    formData.append('certificate', this.pharmaciesInfo.certificate ? this.pharmaciesInfo.certificate : '');
    formData.append('emailId', this.pharmaciesInfo.emailId ? this.pharmaciesInfo.emailId : '',);
    formData.append('whatsAppNumber', this.pharmaciesInfo.whatsAppNumber ? this.pharmaciesInfo.whatsAppNumber : '');
    formData.append('website', this.pharmaciesInfo.website ? this.pharmaciesInfo.website : '');
    formData.append('twitterLink', this.pharmaciesInfo.twitterLink ? this.pharmaciesInfo.twitterLink : '');
    formData.append('facebookLink', this.pharmaciesInfo.facebookLink ? this.pharmaciesInfo.facebookLink : '');
    formData.append('instagramLink', this.pharmaciesInfo.instagramLink ? this.pharmaciesInfo.instagramLink : '');
    formData.append('whatsAppLink', this.pharmaciesInfo.whatsAppLink ? this.pharmaciesInfo.whatsAppLink : '',);
    formData.append('hoursOfOperation', this.pharmaciesInfo.hoursOfOperation ? this.pharmaciesInfo.hoursOfOperation : '');

  

    if (this.pharmaciesId){
      //payload.isActive = true;
      this.apiservice
      .apiputcall(`pharmacies/${this.pharmaciesId}`, formData)
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
      .apipostcall('pharmacies', formData)
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
