import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private emitChangeSource = new Subject<any>();

  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(data: {}) {
    this.emitChangeSource.next(data);
  }
  constructor(private http: HttpClient, private router: Router) {}

  apigetcall(url, params) {
    const endpoint = environment.apiUrl + url;
    return this.http.get<any>(endpoint, params).pipe(
      map((responses: any) => {
        return responses;
      }),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  apipostcall(url, params) {
    const endpoint = environment.apiUrl + url;
    return this.http.post<any>(endpoint, params).pipe(
      map((responses: any) => {
        return responses;
      }),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  apiputcall(url, params) {
    const endpoint = environment.apiUrl + url;
    return this.http.put<any>(endpoint, params).pipe(
      map((responses: any) => {
        return responses;
      }),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  apideletecall(url, params) {
    const endpoint = environment.apiUrl + url;
    return this.http.delete<any>(endpoint, params).pipe(
      map((responses: any) => {
        return responses;
      }),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  getuserinfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  gettoken() {
    return localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    this.router.navigate(['/auth/login']);
  }

  login(user: any) {
    const URL = environment.apiUrl + 'api/auth';
    const sendParam = {
      email: user.email,
      password: user.password
    };
    return this.http.post<any>(URL, sendParam).pipe(
      map(response => {

        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('userInfo', JSON.stringify(response));
        return response;
      }),
      catchError(err => {

        return throwError(err.error);
      })
    );
  }
}
