import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: object;
  constructor(private httpClient: HttpClient) {
  }
  public getUserFromServer(a: string, b: string): void {
    this.httpClient
      .post<any[]>('http://localhost/rest-api/users.php/', {mail: a, pass: b})
      .subscribe(
        (response) => {
          this.user = response;
          alert(JSON.stringify(response));
          alert(this.user);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
