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
import { MatChipsModule } from '@angular/material/chips';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SeverityManagementComponent } from './full-portal/severity-management/severity-management.component';
import { ProductManagementComponent } from './full-portal/product-management/product-management.component';
import { InstallationTypeManagementComponent } from './full-portal/installation-type-management/installation-type-management.component';
import { AffectedEnvironmentManagementComponent } from './full-portal/affected-environment-management/affected-environment-management.component';
import { CreateSeverityComponent } from './full-portal/severity-management/create-severity/create-severity.component';
import { ViewSeverityComponent } from './full-portal/severity-management/view-severity/view-severity.component';
import { CreateProductComponent } from './full-portal/product-management/create-product/create-product.component';
import { ViewProductComponent } from './full-portal/product-management/view-product/view-product.component';
import { CreateInstallationTypeComponent } from './full-portal/installation-type-management/create-installation-type/create-installation-type.component';
import { ViewInstallationTypeComponent } from './full-portal/installation-type-management/view-installation-type/view-installation-type.component';
import { CreateAffectedEnvironmentComponent } from './full-portal/affected-environment-management/create-affected-environment/create-affected-environment.component';
import { ViewAffectedEnvironmentComponent } from './full-portal/affected-environment-management/view-affected-environment/view-affected-environment.component';

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
    SeverityManagementComponent,
    ProductManagementComponent,
    InstallationTypeManagementComponent,
    AffectedEnvironmentManagementComponent,
    CreateSeverityComponent,
    ViewSeverityComponent,
    CreateProductComponent,
    ViewProductComponent,
    CreateInstallationTypeComponent,
    ViewInstallationTypeComponent,
    CreateAffectedEnvironmentComponent,
    ViewAffectedEnvironmentComponent,
  ],
  imports: [CommonModule, MetismenuAngularModule, MainPortalRoutingModule, DataTablesModule, MatChipsModule, NgxDropzoneModule],
  exports: [MainPortalComponent],
})
export class MainPortalModule {}
