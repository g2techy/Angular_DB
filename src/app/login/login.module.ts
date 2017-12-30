import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { AuthService } from "../services/auth.service";

@NgModule({
declarations: [
    LoginComponent
],
imports: [
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule
],
providers : [ AuthService ]
})
export class LoginModule { }