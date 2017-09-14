import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: String;
  user: any;

  constructor(private http: Http) { }

  registerUser(user){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: header})
            .map(res => res.json());
  }

}
