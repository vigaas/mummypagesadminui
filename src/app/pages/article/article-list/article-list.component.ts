import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  public apiData: any = {};
  constructor(public apiservice: ApiserviceService,
    ) {

      this.getArticle();

     }

  ngOnInit(): void {
  }

  public getArticle(): void {
    this.apiservice
      .apigetcall('articles', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.articlesData = resp;
        }
      });
  }

  public deleteArticle(articleId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiservice
      .apideletecall(`articles/${articleId}`, {})
      .subscribe(resp => {
        if (resp) {
          this.getArticle();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }
      });
      }
    });
  }
}
