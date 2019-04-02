import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap, delay } from 'rxjs/operators';
import { Constants } from './../utils/constants'
import { StorageUtils } from '../utils/storage-utils';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private storage: StorageUtils,
              private http: HttpClient) { }


loadHome() {

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

  return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}home/loadHome`, httpOptions)
      .pipe(
        //delay(4000),
        map(response => response)
      )
}

loadHomeLocalization(latitude: any, longitude: any) {

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

  return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}home/loadHome/${latitude}/${longitude}`, httpOptions)
      .pipe(
        //delay(4000),
        map(response => response)
      )
}

search(terms: Observable<string>) {
    return terms.pipe(
              debounceTime(400),
              distinctUntilChanged(),
              switchMap(term =>
                this.searchEntries(term)
                .pipe(
                  catchError(error => from([]))
                  )
                )
              )

  }

  searchEntries(term) {
    return this.http
        .get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}categoryExt/searchCategoryName/${term}`)
        .pipe(map(res => res));
  }

  loadPosts() {
    // http://localhost:8000/wp-json/wp/v2/posts?per_page=3
    // http://blog.mbn.mangotest.com
    return this.http
        .get(`${Constants.SERVICE_URL_BLOG}/wp-json/wp/v2/posts?per_page=3`)
        .pipe(map(res => res));
  }


  
  loadSolutions(search: any) {
    // http://127.0.0.1:8080/MBNWs/rs/categoryExt/searchCategory
    return this.http
    .post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}categoryExt/searchCategory`, search)
    .pipe(map(res => res));
  }
}
