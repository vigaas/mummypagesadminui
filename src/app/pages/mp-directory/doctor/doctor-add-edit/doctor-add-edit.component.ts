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
  public doctorInfo: any = {};
  public doctorId = this.activeroute.snapshot.paramMap.get('doctorId');
  constructor(public router: Router,  public apiservice: ApiserviceService, public activeroute: ActivatedRoute, ) { }

  ngOnInit(): void {
    if (this.doctorId){
      this._getDoctorById();
    }
  }

  public onClickSaveDoctor(form){
    if (form.invalid) {
      return;
    }

    const payload: any = {
      name: this.doctorInfo.name,
      qualifications: this.doctorInfo.qualifications ? this.doctorInfo.qualifications : '',
      specialistIn: this.doctorInfo.specialistIn ? this.doctorInfo.specialistIn : '',
      contactNumber: this.doctorInfo.contactNumber ? this.doctorInfo.contactNumber : '',
      emailId: this.doctorInfo.emailId ? this.doctorInfo.emailId : null,
      visitingHospitals: this.doctorInfo.visitingHospitals ? this.doctorInfo.visitingHospitals : ''
    };

    if (this.doctorId){
      payload.isActive = true ;
      this.apiservice
      .apiputcall(`doctors/${this.doctorId}`, payload)
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
      .apipostcall('doctors', payload)
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
