import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AlertService } from '../services/alert-service.service';
import { PartyService } from '../services/patry.service';
import { AuthService } from '../services/auth.service';
import { LogService } from '../helpers/logging/log.service';

import { PagerComponent } from "../shared/pager/pager.component";
import { PartySearch, PartySearchResult, Party } from '../models/party-model';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-party-search',
    templateUrl: './party-search.component.html',
    styleUrls: ['./party-search.component.css']
})
export class PartySearchComponent  implements OnInit {
    searchResult : PartySearchResult;
    searchForm : FormGroup;
    currentSearchModel : PartySearch;
    @ViewChild('pager') pager : PagerComponent;
    pageSize : number;
    
    constructor(private fb : FormBuilder, 
        private alertService : AlertService, 
        private partyService : PartyService,
        private logService : LogService,
        private authService : AuthService,
        private router : Router) { 
            this.creatForm();  
            this.pageSize = environment.appSetting.pageSize;          
    }
    ngOnInit() {        
    }

    creatForm() : void {
        this.searchForm = this.fb.group({
            partyCode : [''],
            firstName : [''],
            lastName : ['']
        });
    }

    onSubmit() : void {
        this.searchResult = null;
        this.currentSearchModel = <PartySearch> this.searchForm.value;
        this.currentSearchModel.pageSize = this.pageSize;
        this.currentSearchModel.userID = this.authService.loggedInUser.userID;
        this.onPageChange(1);
    }

    onAdd() : void {
        this.router.navigate(['/party/add']);
    }

    onPageChange(event : number) {
        this.currentSearchModel.startIndex = event;
        this.logService.info(`search model: ${JSON.stringify(this.currentSearchModel)}`);
        this.partyService.search(this.currentSearchModel).subscribe(result => {
            this.searchResult = result;
            this.pager.init(this.currentSearchModel.pageSize, this.currentSearchModel.startIndex, 
                            this.searchResult.recordCount);
        });
    }
    
    onDeleteParty(event : Party) : void {
        this.logService.info(`deleted party: ${event.partyID}`);
        this.alertService.confirm("Are you sure you want to delete this party?", false, () => {
            this.logService.info('noFn');
        }, () => {
            this.logService.info('yesFn');
            this.partyService.delete(event.partyID).subscribe( partyID => {
                this.alertService.success(`Party '${event.firstName + ' ' + event.lastName}' deleted successfully.`);
                this.onSubmit();
            });
        });
        
    }

}