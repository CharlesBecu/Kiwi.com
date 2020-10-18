import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { VariablesGlobales, RoutingState } from './var-globales';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverModule, PopoverDirective } from 'ngx-bootstrap/popover';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { FullAdPageComponent } from './full-ad-page/full-ad-page.component';
import { FullAdTextComponent } from './full-ad-text/full-ad-text.component';
import { AdInfoComponent } from './ad-info/ad-info.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { AuthJsModule } from './auth-js/auth-js.module';
import { CanActivateDashboardService } from 'src/app/can-activate-dashboard.service';
import { ModalComponent } from './modal/modal.component';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfilPageComponent } from './profil-page/profil-page.component';


const appRoutes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      { path: '', redirectTo: '/auth(h:0)', pathMatch: 'full' }
    ]
  },
  { path: 'dashboard', canActivate: [CanActivateDashboardService], component: MainComponent},
  { path: '', component: HeaderComponent, outlet: 'h' },
  { path: 'ads/:ID' , component: FullAdPageComponent },
  { path: ':p', children: [], outlet: 'h' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];

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
    FullAdPageComponent,
    FullAdTextComponent,
    AdInfoComponent,
    CompanyInfoComponent,
    ModalComponent,
    SignInModalComponent,
    AuthComponent,
    PageNotFoundComponent,
    ProfilPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PopoverModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    VariablesGlobales,
    RoutingState,
    PopoverDirective,
    AuthJsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
