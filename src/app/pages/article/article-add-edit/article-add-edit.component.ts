import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../../modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-add-edit',
  templateUrl: './article-add-edit.component.html',
  styleUrls: ['./article-add-edit.component.scss']
})
export class ArticleAddEditComponent implements OnInit {
  public articleId = this.activeroute.snapshot.paramMap.get('articleId');
  public articleFormFields: any = {
    categoryId: null,
    type: 'TEXT',
    publishType: null,
    featuredImage: File,
    articleImages: [],
    articleLanguage : null
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

  public changeImageUpload(): void {
    this.articleFormFields.articleImages = [];
    this.articleFormFields.featuredImage = null;
    this.articleImages = null;
    this.featuredImages = null;
  }

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
    if (this.articleFormFields.type === 'TEXT') {
      formData.append('featuredImage', this.articleFormFields.featuredImage);
    }
    if (this.articleFormFields.type === 'IMAGES') {
      this.articleFormFields.articleImages.forEach(element => {
        formData.append('articleImages', element);
      });
    }
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
