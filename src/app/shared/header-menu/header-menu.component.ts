import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  constructor(private auth : AuthService) { }

  ngOnInit() {
  }

  isUserLoggedIn(): boolean {
    return this.auth.isUserLoggedIn;
  }
  isAdmin() : boolean {
    return this.auth.isAdmin();
  }
  isBroker() : boolean {
    return this.auth.isBroker();
  }
  
}
