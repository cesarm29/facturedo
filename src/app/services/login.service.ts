import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Base url
  baseurl = 'https://fact2-dev.herokuapp.com/v1';
  fetchParams: any;
  headers: any;

  constructor(private http: HttpClient) { 
     // Http Headers
     this.headers = {
      'Content-Type': 'application/json'
    }
  }

   // Post Login
  public login(data) {
    this.fetchParams = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: (this.headers)
    };
    const url = this.baseurl + '/auth';
    const promise = new Promise((resolve, reject) => {
      fetch(url, this.fetchParams)
        .then(response => {
          const responseJSON = response.json();
          resolve(responseJSON);
        })
        .catch((err) => {
          reject(err);
          console.error(err);
        });
    });
    return promise;
  }

}
