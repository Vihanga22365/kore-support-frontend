import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { MainPortalModule } from './module/views/main-portal/main-portal.module';
import { LogPortalModule } from './module/views/log-portal/log-portal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogPopupComponent } from './module/shared/dialog-popup/dialog-popup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from './core/interceptor/interceptor.interceptor';

@NgModule({
  declarations: [AppComponent, DialogPopupComponent],
  imports: [BrowserModule, AppRoutingModule, MainPortalModule, LogPortalModule, BrowserAnimationsModule],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
