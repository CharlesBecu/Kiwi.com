import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateDashboardService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(): boolean{
    const tok = sessionStorage.getItem('token');
    if (tok === null || tok.split('.').length !== 3){
      this.router.navigate(['auth']);
      return false;
    }
    const date = JSON.parse(window.atob(tok.split('.')[1])).exp * 1000;
    const bool = Date.now() < date;
    if (!bool){
      sessionStorage.removeItem('token');
      this.router.navigate(['auth']);
    }
    return bool;
  }
  getCookie(cname): string {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
}
