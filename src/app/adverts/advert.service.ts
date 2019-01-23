import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Constants } from './../utils/constants'
import { StorageUtils } from '../utils/storage-utils';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private storage: StorageUtils, private http: HttpClient) { }

  saveService(service: any) {
    //http://127.0.0.1:8080/MBNWs/rs/serviceExt/save

    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}serviceExt/save`, service, this.httpOptions)
         .pipe(map(response => response))
  }

  saveBasic(service: any) {
    // http://127.0.0.1:8080/MBNWs/rs/serviceExt/save
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}serviceExt/basicSave`, service, this.httpOptions)
         .pipe(map(response => response))
  }

  loadSolutions() {
    // http://192.168.123.10:8080/MBNWs/rs/category/listActives
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}category/listActives`)
        .pipe(map(response => response))
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.storage.getToken()}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Access-Control-Allow-Headers, Accept, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    })
  }
}
