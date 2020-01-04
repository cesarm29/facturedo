import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Cookies from 'js-cookie';
import { Auctions } from '../model/auctions';
import { Operations } from '../model/operations';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // Base url
  baseurl = 'https://fact2-dev.herokuapp.com/v1';
  fetchParams: any;
  headers: any;

  constructor(private http: HttpClient) {
    // Http Headers
    this.headers = {
      'Authorization': 'JWT ' + Cookies.get('token'),
      'Content-Type': 'application/json'
    }
  }

  // Get auctions
  public getAuctions() {
    this.fetchParams = {
      method: 'GET',
      headers: (this.headers)
    };
    const url = this.baseurl + '/factoring/auctions';
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

  // Get operations
  public getOperations(id) {
    this.fetchParams = {
      method: 'GET',
      headers: (this.headers)
    };
    const url = this.baseurl + '/factoring/operations/' + id;
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
