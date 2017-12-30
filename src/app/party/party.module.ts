import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { PartyService } from '../services/patry.service';
import { PatryRoutingModule } from './party-routing.module';
import { PartyComponent } from "./party.component";
import { PartySearchComponent } from './party-search.component';
import { PartyListComponent } from "./party-list.component";
import { PartyAddComponent } from "./party-add.component";

@NgModule({
    declarations : [ PartyComponent, PartySearchComponent, PartyListComponent, PartyAddComponent ],
    imports : [ CommonModule, ReactiveFormsModule, PatryRoutingModule, SharedModule ],
    providers : [ PartyService ]
})
export class PartyModule {}
