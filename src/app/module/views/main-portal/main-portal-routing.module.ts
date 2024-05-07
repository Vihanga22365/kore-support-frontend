import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './full-portal/dashboard/dashboard.component';
import { CreateTicketComponent } from './full-portal/create-ticket/create-ticket.component';
import { ViewTicketsComponent } from './full-portal/view-tickets/view-tickets.component';
import { CreateUserComponent } from './full-portal/create-user/create-user.component';
import { ViewUsersComponent } from './full-portal/view-users/view-users.component';
import { MainPortalComponent } from './main-portal.component';
import { SingleTicketManageComponent } from './full-portal/single-ticket-manage/single-ticket-manage.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPortalRoutingModule {}
