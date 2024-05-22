import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './full-portal/dashboard/dashboard.component';
import { CreateTicketComponent } from './full-portal/create-ticket/create-ticket.component';
import { ViewTicketsComponent } from './full-portal/view-tickets/view-tickets.component';
import { CreateUserComponent } from './full-portal/create-user/create-user.component';
import { ViewUsersComponent } from './full-portal/view-users/view-users.component';
import { MainPortalComponent } from './main-portal.component';
import { SingleTicketManageComponent } from './full-portal/single-ticket-manage/single-ticket-manage.component';
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

const routes: Routes = [
  {
    path: '',
    component: MainPortalComponent,
    children: [
      { path: '', redirectTo: '/panel/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'create-ticket',
        component: CreateTicketComponent,
      },
      {
        path: 'view-tickets',
        component: ViewTicketsComponent,
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
      },
      {
        path: 'view-users',
        component: ViewUsersComponent,
      },
      {
        path: 'manage-ticket/:id',
        component: SingleTicketManageComponent,
      },
      {
        path: 'severity-management',
        component: SeverityManagementComponent,
        children: [
          {
            path: 'create-severity',
            component: CreateSeverityComponent,
          },
          {
            path: 'view-severity',
            component: ViewSeverityComponent,
          },
        ],
      },
      {
        path: 'product-management',
        component: ProductManagementComponent,
        children: [
          {
            path: 'create-product',
            component: CreateProductComponent,
          },
          {
            path: 'view-product',
            component: ViewProductComponent,
          },
        ],
      },
      {
        path: 'installation-type-management',
        component: InstallationTypeManagementComponent,
        children: [
          {
            path: 'create-installation-type',
            component: CreateInstallationTypeComponent,
          },
          {
            path: 'view-installation-type',
            component: ViewInstallationTypeComponent,
          },
        ],
      },
      {
        path: 'affected-environment-management',
        component: AffectedEnvironmentManagementComponent,
        children: [
          {
            path: 'create-affected-environment',
            component: CreateAffectedEnvironmentComponent,
          },
          {
            path: 'view-affected-environment',
            component: ViewAffectedEnvironmentComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPortalRoutingModule {}