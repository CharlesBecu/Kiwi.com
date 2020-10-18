import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, },
  { path: '', canActivate: [AuthServiceService], component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
