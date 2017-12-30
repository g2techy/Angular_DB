import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartyComponent }       from './party.component';
import { PartySearchComponent } from './party-search.component';
import { PartyAddComponent } from './party-add.component';

const partyRoutes: Routes = [
  { path: '', 
    component: PartyComponent,
    children : [
      {
        path : '',
        component : PartySearchComponent
      },
      {
        path : 'add',
        component : PartyAddComponent
      },
      {
        path : 'edit/:id',
        component : PartyAddComponent
      }
    ] 
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(partyRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class PatryRoutingModule {}