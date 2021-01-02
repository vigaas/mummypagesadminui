import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../../modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-article-add-edit',
  templateUrl: './article-add-edit.component.html',
  styleUrls: ['./article-add-edit.component.scss']
})
export class ArticleAddEditComponent implements OnInit {
  public articleId = this.activeroute.snapshot.paramMap.get('articleId');
  public articleFormFields: any = {
    categoryId: null,
    type: null,
    publishType: null,
    featuredImage: File,
    articleImages: [],
    articleLanguage : null
  };
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '300px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  // uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize',
    'insertVideo', ]
  ]
};
  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];
  public featuredImages: any = '';
  public articleImages: any = '';
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
        apiKey: 'IMAGES'
      },
      {
        id: 2,
        name: 'Image',
        apiKey: 'IMAGES'
      },
      {
        id: 3,
        name: 'Video',
        apiKey: 'IMAGES'
      }
    ],
    language: [{langId: 'ENGLISH', lang : 'ENGLISH'}, {langId: 'TAMIL', lang : 'TAMIL'}, {langId: 'SHINHALA', lang : 'SHINHALA'} ]
  };
  constructor(
    public apiservice: ApiserviceService,
    public router: Router,
    public activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getCategory();
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
          this.articleFormFields.featuredImage = file;
        };
      } else {
        const fileFormatError = `Only ${this.supportedImageFiles.join(
          ', '
        )} file is allowed`;
        Swal.fire('Alert!', fileFormatError, 'warning');
        this.articleFormFields.featuredImage = '';
      }
    }
  }

  public onChangearticleImagesFile(files: FileList): void {
    if (files && files.length > 0) {
      if (files.length > 10) {
        Swal.fire('Alert!', 'You can upload upto 10 Images', 'info');
        this.articleFormFields.articleImages = null;
        return;
      }
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < files.length; index++) {
        const fileReader = new FileReader();
        const thumbnailFile = files.item(index);
        const thumbnailFileType: string = thumbnailFile.name.split('.').pop();

        if (this.supportedImageFiles.includes(`.${thumbnailFileType}`)) {
          fileReader.readAsText(thumbnailFile);
          fileReader.onload = () => {
            const file = files.item(index);
            this.articleFormFields.articleImages.push(file);
          };
        } else {
          const fileFormatError = `Only ${this.supportedImageFiles.join(
            ', '
          )} file is allowed`;
          Swal.fire('Alert!', fileFormatError, 'warning');
          this.articleFormFields.articleImages = null;
          return;
        }
      }
    }
  }

  // public changeImageUpload(): void {
  //   this.articleFormFields.articleImages = [];
  //   this.articleFormFields.featuredImage = null;
  //   this.articleImages = null;
  //   this.featuredImages = null;
  // }

  public onClickSaveArticle(form) {
    if (form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.articleFormFields.title);
    formData.append('description', this.articleFormFields.description);
    formData.append('type', this.articleFormFields.type);
    // tslint:disable-next-line: max-line-length
    formData.append(
      'keywords',
      Array.isArray(this.articleFormFields.keywords)
        ? this.articleFormFields.keywords.join(',')
        : this.articleFormFields.keywords
    );
    // tslint:disable-next-line: max-line-length
    formData.append(
      'tags',
      Array.isArray(this.articleFormFields.tags)
        ? this.articleFormFields.tags.join(',')
        : this.articleFormFields.tags
    );
    formData.append('categoryId', this.articleFormFields.categoryId);
    formData.append('articleLanguage', this.articleFormFields.articleLanguage);
    formData.append('publishType', this.articleFormFields.publishType);
    formData.append('featuredImage', this.articleFormFields.featuredImage);
    this.articleFormFields.articleImages.forEach(element => {
        formData.append('articleImages', element);
      });
    if (this.articleId) {
      this.apiservice
        .apiputcall(`articles/${this.articleId}`, formData)
        .subscribe(results => {
          Swal.fire('Updated!', 'Your Article has been Updated.', 'success');
          this.router.navigate(['/article']);
        });
    } else {
      this.apiservice.apipostcall('articles', formData).subscribe(results => {
        Swal.fire('Added!', 'Your Article has been Added.', 'success');
        this.router.navigate(['/article']);
      });
    }
  }

  private _getCategory(): void {
    this.apiservice.apigetcall('category/', {}).subscribe(resp => {
      if (resp && resp.length) {
        this.apiData.categoryData = resp;
        if (this.articleId) {
          this._getArticleById();
        }
      }
    });
  }

  private _getArticleById(): void {
    this.apiservice
      .apigetcall(`articles/${this.articleId}`, {})
      .subscribe(resp => {
        if (resp) {
          this.articleFormFields = resp;
          this.articleImages = this.articleFormFields.images;
          this.featuredImages = this.articleFormFields.featuredImage;
        }
      });
  }
}
