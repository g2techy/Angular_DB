import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';
import { LogService } from "../helpers/logging/log.service";

import { Party, PartySearch, PartySearchResult, PartyType } from '../models/party-model';

@Injectable()
export class PartyService {
    private apiUrl : string = '';
    
    constructor(private http : HttpClient, private injector : Injector){
        this.apiUrl = environment.appSetting.apiBasePath + 'party/';
    }
    
    private log(message : any) :void {
        const _logService = this.injector.get(LogService);
        _logService.info('partyServie : ' + message);
    }

    search(model : PartySearch) : Observable<PartySearchResult> {
        return this.http.post<PartySearchResult>(this.apiUrl + 'search',model).map(
            data => {
                return data;
            }
        );
    }

    getPartyTypes() : Observable<PartyType[]> {
        return this.http.get<PartyType[]>(this.apiUrl + 'partyTypes')
            .map(data => {
                return data;
            }
        );
    }
    getParty(partyID : number) : Observable<Party> {
        return this.http.get<Party>(this.apiUrl + 'party?partyID=' + partyID)
            .map( party => {
                this.log(`getParty - result : ${JSON.stringify(party)}`)
                return party;
            }
        );
    }

    add(model : Party) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'add', model)
            .map(partyID =>{
                return partyID;
            }
        );
    }

    delete(partyID : number) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'delete?partyID=' + partyID, {})
            .map(partyID =>{
                return partyID;
            }
        );
    }
}