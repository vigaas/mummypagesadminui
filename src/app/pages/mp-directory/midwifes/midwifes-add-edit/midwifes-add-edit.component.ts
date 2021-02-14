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
  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];
  public featuredImages: any = '';
  public articleImages: any[] = [];
  public featuredImagesLabel: any = 'Choose featuredImage';
  public articleImagesLabel: any = 'Choose Article Images (Max 10)';
  public midWifesInfo: any = {};
  public midwifesId = this.activeroute.snapshot.paramMap.get('midwifesId');
  constructor(public router: Router,  public apiservice: ApiserviceService, public activeroute: ActivatedRoute, ) { }

  ngOnInit(): void {
    if (this.midwifesId){
      this._getMidWifeById();
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

  public onClickSaveMidWifes(form){
    if (form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('name', this.midWifesInfo.name);
    formData.append('address', this.midWifesInfo.address ? this.midWifesInfo.address : '',);
    formData.append('latLong', '');
    formData.append('images', this.featuredImages);
    formData.append('contactNumber', this.midWifesInfo.contactNumber ? this.midWifesInfo.contactNumber : '');
    formData.append('emailId',this.midWifesInfo.emailId ? this.midWifesInfo.emailId : null);
    formData.append('whatsAppNumber', this.midWifesInfo.whatsAppNumber ? this.midWifesInfo.whatsAppNumber : '');

    if (this.midwifesId){
      //payload.isActive = true ;
      this.apiservice
      .apiputcall(`midwifes/${this.midwifesId}`, formData)
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
      .apipostcall('midwifes', formData)
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
