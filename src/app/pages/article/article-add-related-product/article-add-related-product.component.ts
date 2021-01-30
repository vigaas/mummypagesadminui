import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FroalaOptions } from 'ngx-froala';

@Component({
  selector: 'app-article-add-related-product',
  templateUrl: './article-add-related-product.component.html',
  styleUrls: ['./article-add-related-product.component.scss']
})
export class ArticleAddRelatedProductComponent implements OnInit {
  public articleId ;
  public articleFormFields: any = {
    categoryId: null,
    type: null,
    publishType: null,
    featuredImage: File,
    articleImages: [],
    articleLanguage : null
  };
  editorConfig: FroalaOptions;
  public relatedProduct: any = { };

  public products: any = [{
    name : '',
    link: '',
    productImg: null
  }];
  public tabIndex = 1;
  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];
  public featuredImages: any = '';
  public articleImages: any[] = [];
  public featuredImagesLabel: any = 'Choose featuredImage';
  public articleImagesLabel: any = 'Choose Article Images (Max 10)';
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
  constructor(  public apiservice: ApiserviceService, public routers: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.routers.paramMap.subscribe(data => {
      this.articleId = data.get('articleId');
      this._getCategory();
    });
  }

  public onChangeThumbnailFile(files: FileList): void {
    const fileReader = new FileReader();
    const imageLabel = document.getElementById('featuredImages');

    if (files && files.length > 0) {
      const thumbnailFile = files.item(0);
      const thumbnailFileType: string = thumbnailFile.name.split('.').pop();

      if (this.supportedImageFiles.includes(`.${thumbnailFileType}`)) {
        fileReader.readAsText(thumbnailFile);
        fileReader.onload = () => {
          const file = files.item(0);
          this.featuredImages = file;
          imageLabel.textContent = thumbnailFile.name;

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

  public onChangearticleImagesFile(files: FileList): void {
    const imageLabel = document.getElementById('articleImages');

    if (files && files.length > 0) {
      if (files.length > 10) {
        Swal.fire('Alert!', 'You can upload upto 10 Images', 'info');
        this.articleImages = [];
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
            this.articleImages.push(file);
            imageLabel.textContent = file.name;

          };
        } else {
          const fileFormatError = `Only ${this.supportedImageFiles.join(
            ', '
          )} file is allowed`;
          Swal.fire('Alert!', fileFormatError, 'warning');
          this.articleImages = [];
          imageLabel.textContent = this.articleImagesLabel;
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
    if (this.featuredImages){
      formData.append('featuredImage', this.featuredImages);
    }
    if (this.articleImages && this.articleImages.length){
      this.articleImages.forEach(element => {
          formData.append('articleImages', element);
        });
    }
    if (this.articleId) {
      this.apiservice
        .apiputcall(`articles/${this.articleId}`, formData)
        .subscribe(results => {
          Swal.fire('Updated!', 'Your Article has been Updated.', 'success');
          this.tabIndex = 2;
        });
    } else {
      this.apiservice.apipostcall('articles', formData).subscribe(results => {
        Swal.fire('Added!', 'Your Article has been Added.', 'success');
        this.tabIndex = 2;
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
        if (resp ) {
          this.articleFormFields = resp;
          if (resp.relatedProducts.length){
            this.products = resp.relatedProducts;
          }
        }
      });
  }

  public onChangeProductThumbnailFile(files: FileList, index: number): void {
    const fileReader = new FileReader();

    if (files && files.length > 0) {
      const thumbnailFile = files.item(0);
      const thumbnailFileType: string = thumbnailFile.name.split('.').pop();

      if (this.supportedImageFiles.includes(`.${thumbnailFileType}`)) {
        fileReader.readAsText(thumbnailFile);
        fileReader.onload = () => {
          const file = files.item(0);
          this.products[index].productImg = file;
        };
      } else {
        const fileFormatError = `Only ${this.supportedImageFiles.join(
          ', '
        )} file is allowed`;
        Swal.fire('Alert!', fileFormatError, 'warning');
        this.products[index].productImg = null;
      }
    }
  }

  public onClickSaveRelatedProduct(form) {
    if (form.invalid) {
      return;
    }
    const formData = new FormData();
    const productImg = [];
    this.products.forEach((element, index) => {
      productImg.push(element.productImg);
      formData.append(`product${index + 1}Thumbnail`,  element.productImg);
      delete element.productImg;
    });
    formData.append('relatedProducts', JSON.stringify( this.products));

    this.apiservice
    .apiputcall(`articles/approve/${this.articleId}`, formData)
    .subscribe(results => {
      Swal.fire('Updated!', 'Your Article has been Updated.', 'success');
      this.router.navigate(['/article/pending-approval']);
    });

  }

  public addProducts(){
    if ( this.products.length < 4){
      this.products.push({
        name : '',
        link: '',
        productImg: ''
      });
    }else {
      Swal.fire('Alert!', 'Max Product Added', 'warning');
    }

  }

  public removeProducts(index){
    this.products.splice(index, 1);
  }
}
