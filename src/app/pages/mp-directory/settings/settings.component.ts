import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public articleFormFields = null;
  public apiData: any = {
    publishType: [
      {
        id: 1,
        name: 'IMMEDIATE',
        apiKey: 'IMMEDIATE'
      }
    ],
    type: [
      {
        id: 1,
        name: 'Text',
        apiKey: 'TEXT'
      },
      {
        id: 2,
        name: 'Image',
        apiKey: 'IMAGES'
      }
    ],
    language: [{langId: 'ENGLISH', lang : 'ENGLISH'}, {langId: 'TAMIL', lang : 'TAMIL'}, {langId: 'SHINHALA', lang : 'SHINHALA'} ]
  };

  constructor(  public apiservice: ApiserviceService) { }

  ngOnInit(): void {
  }

  public onClickSaveArticle(lang){

      this.apiservice
        // tslint:disable-next-line: deprecation
        .apiputcall(`configurations`, {articleLanguage : lang}).subscribe(resp => {
          if (resp) {
            Swal.fire(
              'Updated!',
              'Your language has been Updated.',
              'success'
            );
          }
  });
}

}
