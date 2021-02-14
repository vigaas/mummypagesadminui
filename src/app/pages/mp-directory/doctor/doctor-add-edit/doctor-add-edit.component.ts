import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-add-edit',
  templateUrl: './doctor-add-edit.component.html',
  styleUrls: ['./doctor-add-edit.component.scss']
})
export class DoctorAddEditComponent implements OnInit {
  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];
  public featuredImages: any = '';
  public articleImages: any[] = [];
  public featuredImagesLabel: any = 'Choose featuredImage';
  public articleImagesLabel: any = 'Choose Article Images (Max 10)';
  public doctorInfo: any = {};
  public doctorId = this.activeroute.snapshot.paramMap.get('doctorId');
  constructor(public router: Router,  public apiservice: ApiserviceService, public activeroute: ActivatedRoute, ) { }

  ngOnInit(): void {
    if (this.doctorId){
      this._getDoctorById();
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

  public onClickSaveDoctor(form){
    if (form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.doctorInfo.organizationName,);
    formData.append('qualifications', this.doctorInfo.qualifications ? this.doctorInfo.qualifications : '');
    formData.append('specialistIn', this.doctorInfo.specialistIn ? this.doctorInfo.specialistIn : '');
    formData.append('images', this.featuredImages);
    formData.append('contactNumber', this.doctorInfo.contactNumber ? this.doctorInfo.contactNumber : '');
    formData.append('emailId', this.doctorInfo.emailId ? this.doctorInfo.emailId : null);
    formData.append('visitingHospitals', this.doctorInfo.visitingHospitals ? this.doctorInfo.visitingHospitals : '');

    if (this.doctorId){
      //payload.isActive = true ;
      this.apiservice
      .apiputcall(`doctors/${this.doctorId}`, formData)
      .subscribe(results => {
        Swal.fire(
          'Updated!',
          'Your Article has been Updated.',
          'success'
        );
        this.router.navigate(['/mpdirectory/doctor']);
      });
    }
    else{
      this.apiservice
      .apipostcall('doctors', formData)
      .subscribe(results => {
        Swal.fire(
          'Added!',
          'Your Article has been Added.',
          'success'
        );
        this.router.navigate(['/mpdirectory/doctor']);
      });
    }
  }

  private _getDoctorById(): void {
    this.apiservice.apigetcall(`doctors/${this.doctorId}`, {}).subscribe(resp => {
      if (resp) {
       this.doctorInfo = resp;
       console.log('hospital', this.doctorInfo);
      }
    });
  }

}
