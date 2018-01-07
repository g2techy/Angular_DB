import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LogService } from '../helpers/logging/log.service';
import { UserRole, LoggedInUser, Login, UserRoleID } from "../models/user-model";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {
    private lsKey_LoginData = 'loginData';
    private lsKey_AuthToken = 'authToken';
    apiUrl : string = '';
    redirectUrl : string;
    isUserLoggedIn : boolean = false;
    loggedInUser : LoggedInUser;
    constructor(private http: HttpClient, private injector : Injector){
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
        let params = `grant_type=password&username=${userName}&password=${password}`;
        return this.http.post<any>(environment.appSetting.apiBasePath + 'token', params)
            .map(data => {
                if(typeof data.access_token !== 'undefined'){
                    localStorage.setItem(this.lsKey_AuthToken, data.access_token);
                    if(typeof data.userInfo !== 'undefined'){
                        this.loggedInUser = JSON.parse(data.userInfo);
                        this.isUserLoggedIn = (this.loggedInUser != null);
                        localStorage.setItem(this.lsKey_LoginData, JSON.stringify(this.loggedInUser));
                    }
                }
                return this.isUserLoggedIn;
            }
        ).catch((err: any) => {
            return Observable.of(err);
        });
    }

    loginOld(userName : string, password : string) : Observable<boolean> {
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
        localStorage.removeItem(this.lsKey_AuthToken);
        localStorage.removeItem(this.lsKey_LoginData);
        this.isUserLoggedIn = false;
        this.loggedInUser = null;
    }

    private log(message) : void {
        let logService = this.injector.get(LogService);
        logService.info(`authService : ${message}`);
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

    getToken() : string {
        let token = localStorage.getItem(this.lsKey_AuthToken);
        return token;
    }

}