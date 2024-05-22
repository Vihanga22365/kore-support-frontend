import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { MainPortalModule } from './module/views/main-portal/main-portal.module';
import { LogPortalModule } from './module/views/log-portal/log-portal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MainPortalModule, LogPortalModule, BrowserAnimationsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
