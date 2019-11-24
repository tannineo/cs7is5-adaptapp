import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Registration} from './registration.model';
import {Login} from './login.model';
import {Tags} from './tags.model';
import {Config} from './config.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

     // Define API
     apiURL = 'http://34.65.122.100/';
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

     constructor(private http: HttpClient) {}

    registerUser(register: Registration) {
      const body: Registration = {
        username: register.username,
        password_not_hashed: register.password_not_hashed,
        email: register.email
      };
      return this.http.post(this.apiURL + 'user/register', body, this.httpOptions);
    }
    loginUser(login: Login) {
      const body: Login = {
        username: login.username,
        password_not_hashed: login.password_not_hashed,
      };
      return this.http.post(this.apiURL + 'user/login', body, this.httpOptions);
    }
    setPreferencesOfUser(tags: Tags) {
      const body: Tags = {
        'tags': tags.tags
      };
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('currentUser')
      });
      return this.http.post(this.apiURL + 'user/tags', body, this.httpOptions);
    }
    logoutUser() {
       console.log(localStorage.getItem('currentUser'));
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('currentUser')
      });
      return this.http.get(this.apiURL + 'user/logout', this.httpOptions);
    }
    updateConfig(config: Config) {
      const body: Config = {
        'force_pic_config': config.force_pic_config,
        'network_status': config.network_status
      };
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('currentUser')
      });
      return this.http.post(this.apiURL + 'user/config', body, this.httpOptions);
    }
    getRecommendedImages() {
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('currentUser')
      });
      return this.http.get(this.apiURL + 'picture/recommend', this.httpOptions);
    }
    getSearchedImages(searchString?) {
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('currentUser')
      });
      if (searchString) {
        return this.http.get(this.apiURL + 'picture/search?search=' + searchString, this.httpOptions);
      } else {
        return this.http.get(this.apiURL + 'picture/search', this.httpOptions);
      }
    }

}
