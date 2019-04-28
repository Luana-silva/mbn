import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageUtils } from '../../utils/storage-utils';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageUtils,
              private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
  
  login(email: string, password: string) {
    
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
      }
            
    return this.http.post(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}user/login`, {email: email, password: password}, httpOptions)
        .pipe(map(response => response))
    }

    forgotPassword(email: string) {
      return this.http.get(`${Constants.SERVICE_URL}${Constants.SERVICE_PROJECT}user/forgotPassword/${email}`)
         .pipe(map(response => response));
    }

    isLoggedIn(): boolean {
      if(this.storage.getUser()) {
        return true;
      }
      return false;
    } 
    
    logout() {
      localStorage.clear();
      this.router.navigate(['login']);
    }
}
