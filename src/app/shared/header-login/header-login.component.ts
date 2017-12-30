import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css']
})
export class HeaderLoginComponent implements OnInit {

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit() {
  }

  isUserLoggedIn() :boolean {
    return this.auth.isUserLoggedIn;
  }

  loggedInUserName() : string {
    if(this.auth.isUserLoggedIn){
      return this.auth.loggedInUser.userDisplayName;
    }
    return '';
  }

  onLogin() : void {
    this.router.navigate(['/login']);
  }

  onLogOut() : void {
    this.auth.logOut();
    this.onLogin();
  }
}
