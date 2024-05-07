import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogPortalRoutingModule } from './log-portal-routing.module';
import { LogPortalComponent } from './log-portal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LogPortalComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, LogPortalRoutingModule],
})
export class LogPortalModule {}
