import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(): boolean{
    const tok = localStorage.getItem('token');
    if (tok === null || tok.split('.').length !== 3){
      this.router.navigate(['auth']);
      return false;
    }
    const date = JSON.parse(window.atob(tok.split('.')[1])).exp * 1000;
    const bool = Date.now() < date;
    if (!bool){
      localStorage.removeItem('token');
      this.router.navigate(['auth']);
    }
    return bool;
  }
}
