import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../Services/auth.service";
import { Router } from "@angular/router";

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authUser(user).subscribe(data => {
      if(data.success){
        // console.log(data);
        this.authService.storeData(data.token, data.user);
        alert("Successful Login...!");
        this.router.navigate(['dashboard']);
       }else{
        // console.log(data);
        alert(data.msg);
        this.router.navigate(['login']);
      }
    })
  }

}
