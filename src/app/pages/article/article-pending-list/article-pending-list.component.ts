import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../modules/auth/_services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-pending-list',
  templateUrl: './article-pending-list.component.html',
  styleUrls: ['./article-pending-list.component.scss']
})
export class ArticlePendingListComponent implements OnInit {
  public apiData: any = {};
  constructor(public apiservice: ApiserviceService,
    ) { }

  ngOnInit(): void {
    this.getPendingArticle();
  }

  public getPendingArticle(): void {
    this.apiservice
      .apigetcall('articles/pending-approvals', {})
      .subscribe(resp => {
        if (resp) {
          this.apiData.articlesData = resp;
        }
      });
  }

  public approveArticle(articleId: string, isApproved: boolean){
    if (isApproved){
      Swal.fire(
        'Already Approved!',
        'This Article has been approved already'
      );
    }else{
      this.apiservice
      .apiputcall(`articles/approve/${articleId}`, {})
      .subscribe(resp => {
        if (resp) {
          this.getPendingArticle();
          Swal.fire(
            'Approved!',
            'Your Article has been approved.',
            'success'
          );
        }
      });
    }
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
          this.getPendingArticle();
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
