import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse,HttpHeaders } from '@angular/common/http';

import { throwError,Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Registration} from './registration.model'
import {Login} from './login.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

     // Define API
     apiURL = 'http://34.65.122.100/';

     constructor(private http: HttpClient) {}
   
    registerUser(register:Registration){
      const body: Registration={
        username: register.username,
        password_not_hashed: register.password_not_hashed,
        email: register.email

      }
      return this.http.post(this.apiURL + 'user/register', body, this.httpOptions)
    }
    loginUser(login:Login){
      const body: Login={
        username: login.username,
        password_not_hashed: login.password_not_hashed,

      }
      return this.http.post(this.apiURL + 'user/login', body, this.httpOptions)
    }
     // Http Options
     httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
     } 
   
}
