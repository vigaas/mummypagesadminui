import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';

@Component({
  selector: 'app-setting-logo',
  templateUrl: './setting-logo.component.html',
  styleUrls: ['./setting-logo.component.scss']
})
export class SettingLogoComponent implements OnInit {

  public faviIcon = null;
  public logoImages = null;
  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];

  constructor(  public apiservice: ApiserviceService) { }

  ngOnInit(): void {
  }


  public onChangearticleImagesFile(files: FileList, logo: boolean): void {
    if (files && files.length > 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < files.length; index++) {
        const fileReader = new FileReader();
        const thumbnailFile = files.item(index);
        const thumbnailFileType: string = thumbnailFile.name.split('.').pop();

        if (this.supportedImageFiles.includes(`.${thumbnailFileType}`)) {
          fileReader.readAsText(thumbnailFile);
          fileReader.onload = () => {
            const file = files.item(index);
            if (logo){
              this.logoImages = file;
            }else{
              this.faviIcon = file;
            }
          };
        } else {
          const fileFormatError = `Only ${this.supportedImageFiles.join(
            ', '
          )} file is allowed`;
          Swal.fire('Alert!', fileFormatError, 'warning');
          if (logo){
            this.logoImages = null;
          }else{
            this.faviIcon = null;
          }
          return;
        }
      }
    }
  }

  public onClicklogo(form){
    if (form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('logo', this.logoImages);
    formData.append('favicon', this.faviIcon);
    this.apiservice
        .apiputcall(`configurations`, formData)
        .subscribe(results => {

          Swal.fire('Updated!', 'Your logo and favi icon has been Updated.', 'success');
          this.logoImages = null;
          this.faviIcon = null;
        });
  }
}
