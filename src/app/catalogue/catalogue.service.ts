import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Constants } from './../utils/constants'
import { StorageUtils } from '../utils/storage-utils';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private storage: StorageUtils,
              private http: HttpClient) { }

              loadServices(service) {

                const httpOptions = {
                  headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    //'Authorization': this.storage.getToken(),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, Access-Control-Allow-Headers, Accept, Authorization, X-Requested-With',
                    'Access-Control-Allow-Credentials': 'true'
                  })
                }

                return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}serviceExt/searchCatalog`, service, httpOptions)
                    .pipe(map(response => response))
              }

              

}
