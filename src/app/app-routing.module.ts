import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { UserRoleID } from "../app/models/user-model";

const appRoutes : Routes = [
  { path : '', redirectTo : '/dashboard', pathMatch : 'full' },
  { path: 'party', loadChildren: 'app/party/party.module#PartyModule', canActivate : [AuthGuard],
    canActivateChild : [AuthGuard], canLoad : [AuthGuard],
    data : { roles : [ UserRoleID.broker ]}
  },
  { path: 'sale', loadChildren: 'app/sale/sale.module#SaleModule', canActivate : [AuthGuard],
    canActivateChild : [AuthGuard], canLoad : [AuthGuard],
    data : { roles : [ UserRoleID.broker ]}
  },
  { path: 'loan', loadChildren: 'app/loan/loan.module#LoanModule', canActivate : [AuthGuard],
    canActivateChild : [AuthGuard], canLoad : [AuthGuard],
    data : { roles : [ UserRoleID.broker ]}
  },
  { path : '**', component : PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports : [ RouterModule ]
})
export class AppRoutingModule { }
