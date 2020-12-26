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
  public articleFormFields: any = {
    categoryId: null,
    type: null,
    publishType: null
  };
  public articleId = this.activeroute.snapshot.paramMap.get('articleId');
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
        id: 1,
        name: 'Video',
        apiKey: 'VIDEO'
      },
      {
        id: 1,
        name: 'Image',
        apiKey: 'IMAGE'
      }
    ]
  };
  constructor(
    public apiservice: ApiserviceService,
    public router: Router,
    public activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getCategory();
  }

  public onClickSaveArticle(form) {
    if (form.invalid) {
      return;
    }

    const payload = {
      title: this.articleFormFields.title,
      description: this.articleFormFields.description,
      type: this.articleFormFields.type,
// tslint:disable-next-line: max-line-length
      keywords: Array.isArray(this.articleFormFields.keywords) ? this.articleFormFields.keywords.join(',') : this.articleFormFields.keywords,
      tags: Array.isArray(this.articleFormFields.tags) ? this.articleFormFields.tags.join(',') : this.articleFormFields.tags,
      categoryId: this.articleFormFields.categoryId,
      publishType: this.articleFormFields.publishType,
    };
    if (this.articleId){
      this.apiservice
      .apiputcall(`articles/${this.articleId}`, payload)
      .subscribe(results => {
        Swal.fire(
          'Updated!',
          'Your Article has been Updated.',
          'success'
        );
        this.router.navigate(['/article']);
      });
    }
    else{
      this.apiservice
      .apipostcall('articles', payload)
      .subscribe(results => {
        Swal.fire(
          'Added!',
          'Your Article has been Added.',
          'success'
        );
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
        }
      });
  }
}
