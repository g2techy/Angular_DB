import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserRole, LoggedInUser, Login, UserRoleID } from "../models/user-model";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {
    private lsKey_LoginData : 'loginData';
    apiUrl : string = '';
    redirectUrl : string;
    isUserLoggedIn : boolean = false;
    loggedInUser : LoggedInUser;
    constructor(private http: HttpClient){
        this.apiUrl = environment.appSetting.apiBasePath + 'account/';
        let loginData : any = localStorage.getItem(this.lsKey_LoginData);
        if(loginData !== undefined && loginData != null){
            loginData = JSON.parse(loginData);
            if(loginData != null){
                this.loggedInUser = loginData;
                this.isUserLoggedIn = true;
            }
        }
    }

    login(userName : string, password : string) : Observable<boolean> {
        let model = new Login();
        model.userName = userName;
        model.password = password;
        return this.http.post<LoggedInUser>(this.apiUrl + 'login', model)
            .map(data => {
                this.loggedInUser = data;
                this.isUserLoggedIn = (this.loggedInUser != null);
                localStorage.setItem(this.lsKey_LoginData, JSON.stringify(this.loggedInUser));
                return this.isUserLoggedIn;
            }
        );
    }

    logOut() : void {
        localStorage.removeItem(this.lsKey_LoginData);
        this.isUserLoggedIn = false;
        this.loggedInUser = null;
    }

    private isUserHasRole(roleID : number) : boolean {
        return (this.isUserLoggedIn && 
                this.loggedInUser.userRoles.findIndex(r=> r.roleID == roleID) >= 0);
    }

    public isUserHasRoles(roles : number[]) : boolean {
        let hasRole = false;
        for(let roleID of roles){
            hasRole = this.isUserHasRole(+roleID);
            if(hasRole){
                break;
            }
        }
        return hasRole;
    }

    isAdmin() : boolean {
        return this.isUserHasRole(UserRoleID.admin);
    }

    isBroker() : boolean {
        return this.isUserHasRole(UserRoleID.broker);
    }

}