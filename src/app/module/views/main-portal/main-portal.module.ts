import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPortalRoutingModule } from './main-portal-routing.module';
import { MainPortalSideBarComponent } from '../../shared/main-portal-side-bar/main-portal-side-bar.component';
import { MainPortalNavHeaderComponent } from '../../shared/main-portal-nav-header/main-portal-nav-header.component';
import { MainPortalComponent } from './main-portal.component';
import { DashboardComponent } from './full-portal/dashboard/dashboard.component';
import { CreateTicketComponent } from './full-portal/create-ticket/create-ticket.component';
import { ViewTicketsComponent } from './full-portal/view-tickets/view-tickets.component';
import { FullPortalComponent } from './full-portal/full-portal.component';
import { MetismenuAngularModule } from '@metismenu/angular';
import { CreateUserComponent } from './full-portal/create-user/create-user.component';
import { ViewUsersComponent } from './full-portal/view-users/view-users.component';
import { MainPortalTimeDateComponent } from '../../shared/main-portal-time-date/main-portal-time-date.component';
import { SingleTicketManageComponent } from './full-portal/single-ticket-manage/single-ticket-manage.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    MainPortalSideBarComponent,
    MainPortalNavHeaderComponent,
    MainPortalComponent,
    FullPortalComponent,
    DashboardComponent,
    CreateTicketComponent,
    ViewTicketsComponent,
    CreateUserComponent,
    ViewUsersComponent,
    MainPortalTimeDateComponent,
    SingleTicketManageComponent,
  ],
  imports: [CommonModule, MetismenuAngularModule, MainPortalRoutingModule, DataTablesModule],
  exports: [MainPortalComponent],
})
export class MainPortalModule {}
