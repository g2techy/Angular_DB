import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';

import { PartySearchResult, Party } from "../models/party-model";

@Component({
    selector : 'app-party-list',
    templateUrl : './party-list.component.html',
    styleUrls : ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {
    @Input() searchResult : PartySearchResult;
    @Output() deleteParty : EventEmitter<Party>;

    constructor(private router : Router ){
        this.deleteParty = new EventEmitter<Party>();
    }

    ngOnInit () { }

    onEdit(party : Party) : void {
        this.router.navigate(['/party/edit/', party.partyID, {name: party.firstName}]);
    }

    onDelete(party : Party) : void {
        if(window.confirm(`Are you sure you want to delete '${party.firstName + ' ' + party.lastName}' party?`)){
            this.deleteParty.emit(party);
        }
    }
}