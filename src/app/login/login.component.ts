import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;  
  get userName() { return this.loginForm.get('userName'); }  
  get password() { return this.loginForm.get('password'); }
  isLoginFailed : boolean = false;

  constructor(private fb : FormBuilder, 
              private authService : AuthService,
              private alertService : AlertService, 
              private router : Router) { 
    this.creatForm();
  }

  ngOnInit() {
  }

  creatForm() : void {
    this.loginForm = this.fb.group({
      userName : ['', Validators.required ],
      password : ['', Validators.required ]
    });
  }

  onSubmit() : void {
    this.authService.login(this.userName.value, this.password.value).subscribe(
      (success) => {
        this.isLoginFailed = !success;
        if(this.authService.isUserLoggedIn){
          this.router.navigate(['./dashboard']);
        }else {
          this.alertService.error('Invalid user name or password. Please try again!');
        }
      }, err => {
        throw err;
      }
    );
  }

}
