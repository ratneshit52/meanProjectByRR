import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ValidateService } from '../../Services/validate.service';
import { Router } from '@angular/router';

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
    private route: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    // console.log("Test Here :  " + this.name);
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Reqired field Code
    if(!this.validateServices.validateRegister(user)){
      alert('Please fill in all fields...!');
      return false;
    }

    if(!this.validateServices.validataEmail(user.email)){
      alert('Please use valid Email...!');
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        alert('You are successfully register now continew with login...!');
        this.route.navigate(['/login']);
      } else {
        alert('Oopss! Some Problem with registration. Try again...!');
        this.route.navigate(['/register']);
      }
    })    
  }

}
