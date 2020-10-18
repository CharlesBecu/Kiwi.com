import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  logIn(e, mail, pass): void {
    e.preventDefault();
    this.http
      .get<string>(
        `https://api.job-kiwi.com/v1/token?g=a&m=${mail}&p=${pass}&c_id=&c_pass=`,
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .subscribe(
        (response) => {
          localStorage.setItem('token', response);
          this.router.navigate([ '' ]);
        },
        (error) => {
          alert('Incorrect login info');
        }
      );
  }

}
