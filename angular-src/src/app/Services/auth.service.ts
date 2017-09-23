import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: string;
  user: any;

  constructor(private http: Http) { }

  // tslint:disable-next-line:one-line
  registerUser(user){
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: header})
            .map(res => res.json());
  }

  // tslint:disable-next-line:one-line
  authUser(user){
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: header})
            .map(res => res.json());
  }

  // tslint:disable-next-line:one-line
  getProfile(){
    const header = new Headers();
    this.loadToken();
    header.append('Authorization', this.authToken);
    header.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: header})
            .map(res => res.json());
  }

  // tslint:disable-next-line:one-line
  loadToken(){
    const cToken = localStorage.getItem('id_token');
    this.authToken = cToken;
  }

  // tslint:disable-next-line:one-line
  loggedIn() {
    return tokenNotExpired('id_token');
  }

  // tslint:disable-next-line:one-line
  storeData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.authUser = user;
  }

  // tslint:disable-next-line:one-line
  logout(){
    this.authToken = null;
    this.user = null;
    
  }

}
