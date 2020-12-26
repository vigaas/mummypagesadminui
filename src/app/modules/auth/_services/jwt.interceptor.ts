import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import Swal from 'sweetalert2';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    this.loader.show();
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    const started = Date.now();

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            console.log(
              `Request for ${request.urlWithParams} took ${elapsed} ms.`
            );
          }
        },
        (error: any) => {
          console.error('NICE ERROR', error);
          this.loader.hide();
          let message = '';
          switch (error.statusText) {
            case 'Unknown Error':
              message = '';
              break;
            default:
              message = error.error.message;
              break;
          }
          Swal.fire({
            title: error.error.statusCode,
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            text: message,
            icon: 'error'
          });
        }
      ),
      finalize(() => {
        this.loader.hide();
      })
    );
  }
}
