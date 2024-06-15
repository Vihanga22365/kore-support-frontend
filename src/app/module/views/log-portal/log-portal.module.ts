import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogPortalRoutingModule } from './log-portal-routing.module';
import { LogPortalComponent } from './log-portal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LogPortalComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LogPortalRoutingModule],
})
export class LogPortalModule {}
