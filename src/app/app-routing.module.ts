import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/panel/dashboard' },
  {
    path: 'panel',
    canActivate: [AuthGuard],
    loadChildren: () => import('./module/views/main-portal/main-portal.module').then((m) => m.MainPortalModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./module/views/log-portal/log-portal.module').then((m) => m.LogPortalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
