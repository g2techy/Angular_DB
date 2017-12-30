import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { SharedModule } from "./shared/shared.module";
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { from } from 'rxjs/observable/from';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    SharedModule,
    LoginModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers : [],
  bootstrap: [AppComponent]
})
export class AppModule { }
