import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Constants } from './../../utils/constants';
import { StorageUtils } from '../../utils/storage-utils';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private storage: StorageUtils,
              private http: HttpClient) { }



  loadRegister(idUser: string) {
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}register/load/${idUser}`, this.httpOptions)
        .pipe(map(response => response))
  }

  loadReference() {
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}reference/listAll`, this.httpOptions)
        .pipe(map(response => response))
  }

  loadOccupation() {
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}occupation/listAll`, this.httpOptions)
        .pipe(map(response => response))
  }

  returnAddress(cep: string){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
      .pipe(map(response => response))
  }

  loadCompany(idUser: string) {
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}companyExt/loadRegister/${idUser}`, this.httpOptions)
        .pipe(map(response => response))
  }

  loadLanguages() {
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}language/listAll`, this.httpOptions)
      .pipe(map(response => response))
  }

  loadCurrency() {
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}currency/listAll`, this.httpOptions)
      .pipe(map(response => response))
  }

  loadSettings(idUser: string) {
   return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}settings/loadByIdUser/${idUser}`, this.httpOptions)
        .pipe(map(response => response))
  }

  saveRegister(register: any) {
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}register/save`, register, this.httpOptions)
         .pipe(map(response => response))
  }

  saveCompany(company: any) {
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}companyExt/save`, company, this.httpOptions)
         .pipe(map(response => response))
  }

  saveSettings(settings: any) {
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}settings/save`, settings, this.httpOptions)
         .pipe(map(response => response))
  }

  saveUserImage(photoUpload: any) {
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}user/saveUserImage`, photoUpload, this.httpOptions)
         .pipe(map(response => response))
  }

  saveCompanyImage(photoUpload: any) {
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}companyExt/saveCompanyImage`, photoUpload, this.httpOptions)
         .pipe(map(response => response))
  }

  confirmationPhone(code) {
    //http://127.0.0.1:8080/MBNWs/rs/user/validateKey
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}user/validateKey`, code, this.httpOptions)
    .pipe(map(response => response))
  }

  listTimezone() {
    //http://192.168.123.10:8008/MBNWs/rs/timeZone/listAll
    return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}timeZone/listAll`, this.httpOptions)
        .pipe(map(response => response))
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',  // this.storage.getIdUser()
      'Authorization': `Bearer ${this.storage.getToken()}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Access-Control-Allow-Headers, Accept, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    })
  }
}
