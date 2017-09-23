import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ValidateService } from '../../Services/validate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateServices: ValidateService,
    private authService: AuthService,
    private route: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    // console.log("Test Here :  " + this.name);
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Reqired field Code
    if (!this.validateServices.validateRegister(user)) {
      this._flashMessagesService.show('Please fill in all fields...!', {cssClass: 'alert-warning', timeout: 1000});
      return false;
    }

    if (!this.validateServices.validataEmail(user.email)) {
      this._flashMessagesService.show('Please use valid Email...!', {cssClass: 'alert-warning', timeout: 1000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        // tslint:disable-next-line:max-line-length
        this._flashMessagesService.show('You are successfully register now continew with login...!', { cssClass: 'alert-success', timeout: 1000});
        this.route.navigate(['/login']);
      } else {
        this._flashMessagesService.show('Oopss! Some Problem with registration. Try again...!', { cssClass: 'alert-danger', timeout: 1000});
        this.route.navigate(['/register']);
      }
    });
  }

}
