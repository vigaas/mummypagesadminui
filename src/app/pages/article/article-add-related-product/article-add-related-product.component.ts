import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiserviceService } from 'src/app/modules/auth/_services/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-add-related-product',
  templateUrl: './article-add-related-product.component.html',
  styleUrls: ['./article-add-related-product.component.scss']
})
export class ArticleAddRelatedProductComponent implements OnInit {
  public articleId ;
  public relatedProduct: any = { };

  public products: any = [{
    name : '',
    link: '',
    productImg: null
  }];

  public supportedImageFiles: string[] = ['.png', '.jpg', '.jpeg'];
  constructor(  public apiservice: ApiserviceService, public router: ActivatedRoute, public routers: Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(data => {
      this.articleId = data.get('articleId');
      this._getArticleById();
    });
  }

  public onChangeThumbnailFile(files: FileList, index: number): void {
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

  public onClickSaveArticle(form) {
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
      this.routers.navigate(['/article/pending-approval']);
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


  private _getArticleById(): void {
    this.apiservice
      .apigetcall(`articles/${this.articleId}`, {})
      .subscribe(resp => {
        if (resp && resp.relatedProducts.length) {
          this.products = resp.relatedProducts;

        }
      });
  }
}
