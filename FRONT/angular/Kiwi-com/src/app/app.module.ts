import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetJobAdsComponent } from './widget-job-ads/widget-job-ads.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { DashboardChoComponent } from './dashboard-cho/dashboard-cho.component';
import { JobAdComponent } from './job-ad/job-ad.component';
import { DashSideComponent } from './dash-side/dash-side.component';
import { DashMainComponent } from './dash-main/dash-main.component';
import { BarDeRechercheStyleeeeComponent } from './bar-de-recherche-styleeee/bar-de-recherche-styleeee.component';
import { DashSideNotifComponent } from './dash-side-notif/dash-side-notif.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchJobDirective } from './search-job.directive';

@NgModule({
  declarations: [
    AppComponent,
    WidgetJobAdsComponent,
    HeaderComponent,
    MainComponent,
    DashboardChoComponent,
    JobAdComponent,
    DashSideComponent,
    DashMainComponent,
    BarDeRechercheStyleeeeComponent,
    DashSideNotifComponent,
    SearchJobDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
