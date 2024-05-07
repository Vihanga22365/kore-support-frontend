import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/panel/dashboard' },
  {
    path: 'panel',
    loadChildren: () => import('./module/views/main-portal/main-portal.module').then((m) => m.MainPortalModule),
  },
  {
    path: 'log-portal',
    loadChildren: () => import('./module/views/log-portal/log-portal.module').then((m) => m.LogPortalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
