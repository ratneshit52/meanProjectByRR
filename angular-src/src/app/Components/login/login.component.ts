import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authUser(user).subscribe(data => {
      if (data.success) {
        // console.log(data);
        this._flashMessagesService.show('Success Full Login...!', {cssClass: 'alert-success', timeout: 1000})
        this.authService.storeData(data.token, data.user);
        this.router.navigate(['dashboard']);
       } else {
        this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 1000})
        this.router.navigate(['login']);
      }
    })
  }

}
