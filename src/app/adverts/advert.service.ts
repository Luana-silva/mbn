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

  loadAdverts(idUser: string, page: any) {
    // http://192.168.123.10:8080/MBNWs/rs/serviceExt/listServiceExtByIdObj/cc493975-9a0e-495a-8530-66c59e8b795d/1
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}serviceExt/listServiceExtByIdObj/${idUser}/${page}`, this.httpOptions)
        .pipe(map(response => response))
  }

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
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}category/listActives`, this.httpOptions)
        .pipe(map(response => response))
  }

  loadReference() {
    // http://192.168.123.10:8080/MBNWs/rs/userReference/listReferenceByToken
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}userReference/listReferenceByToken`, this.httpOptions)
        .pipe(map(response => response))
  }

  loadDetailService(id: string) {
    // http://192.168.123.10:8080/MBNWs/rs/serviceExt/loadDetail/dbb24f29-5bc0-4eae-8bd0-869c94a7a4a2
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}serviceExt/loadDetail/${id}`, this.httpOptions)
        .pipe(map(response => response))
  }

  loadService(id: string) {
    //http://127.0.0.1:8080/MBNWs/rs/serviceExt/load/602c0736-d4a0-4cc5-b43b-fccd655aea8f
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}serviceExt/load/${id}`, this.httpOptions)
        .pipe(map(response => response))
  }

  checkRegister(idUser: string) {
    // http://127.0.0.1:8080/MBNWs/rs/serviceExt/checkRegister/cc493975-9a0e-495a-8530-66c59e8b795d
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}serviceExt/checkRegister/${idUser}`, this.httpOptions)
        .pipe(map(response => response))
  }

  returnAddress(cep: string){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
      .pipe(map(response => response))
  }
  
  saveImage(photoUpload) {
    //http://127.0.0.1:8080/MBNWs/rs/serviceExt/saveImage
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}serviceExt/saveImage`, photoUpload, this.httpOptions)
         .pipe(map(response => response))
  }

  messageModel() {
    //http://192.168.123.10:8008/MBNWs/rs/messageModel/listAll
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}messageModel/listAll`, this.httpOptions)
    .pipe(map(response => response))
  }

  faqSave(message) {
    //http://127.0.0.1:8080/MBNWs/rs/messageModel/save
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}faq/save`, message, this.httpOptions)
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
