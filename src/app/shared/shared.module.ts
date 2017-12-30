import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

/* Directives... */
import { AutoFocusDirective } from '../directives/auto-focus.directive';

/* Components... */
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { AlertComponent } from './alert/alert.component';
import { PagerComponent } from './pager/pager.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    AutoFocusDirective,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    HeaderLoginComponent,
    AlertComponent,
    PagerComponent
  ],
  exports : [ AutoFocusDirective,
    HeaderComponent, FooterComponent, HeaderMenuComponent, 
    HeaderLoginComponent, AlertComponent, PagerComponent 
  ]
})
export class SharedModule { }
