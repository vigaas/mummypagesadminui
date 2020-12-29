import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../modules/auth/_services/apiservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-digital-magazine-add-edit',
  templateUrl: './digital-magazine-add-edit.component.html',
  styleUrls: ['./digital-magazine-add-edit.component.scss']
})
export class DigitalMagazineAddEditComponent implements OnInit {
  public digitalMagazineFormFields: any = {
    title: '',
    description: '',
    magazinePDF: File,
    thumbnailImage: File
  };
  public supportedFiles: string[] = ['.pdf'];
  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];

  public digitalMagazineId = this.activeroute.snapshot.paramMap.get(
    'digitalMagazineId'
  );

  constructor(
    public apiservice: ApiserviceService,
    public router: Router,
    public activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.digitalMagazineId) {
      this._getDigitalMagazineById();
    }
  }

  public onClickSaveCategory(form) {
    if (form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.digitalMagazineFormFields.title);
    formData.append('description', this.digitalMagazineFormFields.description);
    formData.append(
      'thumbnailImage',
      this.digitalMagazineFormFields.thumbnailImage
    );
    formData.append('magazinePDF', this.digitalMagazineFormFields.magazinePDF);

    if (this.digitalMagazineId) {
      this.apiservice
        .apiputcall(`magazines/${this.digitalMagazineId}`, formData)
        .subscribe(results => {
          Swal.fire(
            'Updated!',
            'Your Digital Magazine has been Updated.',
            'success'
          );
          this.router.navigate(['/digital-magazine/list']);
        });
    } else {
      this.apiservice.apipostcall('magazines', formData).subscribe(results => {
        this.router.navigate(['/digital-magazine/list']);
        Swal.fire(
          'Added!',
          'Your Digital Magazine has been Added.',
          'success'
        );
      });
    }
  }

  public onChangeThumbnailFile(files: FileList): void {
    const fileReader = new FileReader();

    if (files && files.length > 0) {
      const thumbnailFile = files.item(0);
      const thumbnailFileType: string = thumbnailFile.name.split('.').pop();

      if (this.supportedImageFiles.includes(`.${thumbnailFileType}`)) {
        fileReader.readAsText(thumbnailFile);
        fileReader.onload = () => {
          const file = files.item(0);
          this.digitalMagazineFormFields.thumbnailImage = file;
        };
      } else {
        const fileFormatError = `Only ${this.supportedImageFiles.join(
          ', '
        )} file is allowed`;
        Swal.fire('Alert!', fileFormatError, 'warning');
        this.digitalMagazineFormFields.thumbnailImage = '';
      }
    }
  }

  public onChangeMagazineFile(files: FileList): void {
    const fileReader = new FileReader();

    if (files && files.length > 0) {
      const thumbnailFile = files.item(0);
      const thumbnailFileType: string = thumbnailFile.name.split('.').pop();

      if (this.supportedFiles.includes(`.${thumbnailFileType}`)) {
        fileReader.readAsText(thumbnailFile);
        fileReader.onload = () => {
          const file = files.item(0);
          this.digitalMagazineFormFields.magazinePDF = file;
        };
      } else {
        const fileFormatError = `Only ${this.supportedFiles.join(
          ', '
        )} file is allowed`;
        Swal.fire('Alert!', fileFormatError, 'warning');
        this.digitalMagazineFormFields.magazinePDF = '';
      }
    }
  }

  private _getDigitalMagazineById(): void {
    this.apiservice
      .apigetcall(`magazines/${this.digitalMagazineId}`, {})
      .subscribe(resp => {
        if (resp) {
          this.digitalMagazineFormFields = resp;
        }
      });
  }
}
