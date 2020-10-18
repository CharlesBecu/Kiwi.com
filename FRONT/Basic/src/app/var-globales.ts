import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
// import { HttpHeaders } from '@angular/common/http';

export class Ads {
  id: number;
  endDate: Date;
  title: string;
  company: number | {
    ID: number,
    NAME: string
  };
  location: string;
  salary: string;
  preview: string;
  type: string;
  tags: [string];
  full: string;

  constructor(fetch: {
    ID: number,
    END: Date,
    TITLE: string,
    COMPANY: number | {
      ID: number,
      NAME: string
    },
    LOCATION: string,
    SALARY: string,
    PREVIEW: string,
    CONTRACT: string,
    TAGS: string,
    FULL?: string
  }) {
    this.id = fetch.ID;
    this.endDate = fetch.END;
    this.title = fetch.TITLE;
    this.company = fetch.COMPANY;
    this.location = fetch.LOCATION;
    this.salary = fetch.SALARY;
    this.preview = fetch.PREVIEW;
    this.type = fetch.CONTRACT;
    this.tags = JSON.parse(fetch.TAGS);
    this.full = fetch.FULL === undefined ? null : fetch.FULL;
    // console.log(this.send());
  }
  getCompany(bool = false): string {
    return bool ? typeof this.company === 'number' ? null : this.company.NAME : typeof this.company === 'number' ? null : this.company.NAME;
  }
  send(): string {
    return JSON.stringify({
      ID: this.id,
      END: this.endDate,
      TITLE: this.title,
      COMPANY: this.getCompany(true),
      LOCATION: this.location,
      SALARY: this.salary,
      PREVIEW: this.preview,
      CONTRACT: this.type,
      TAGS: this.tags,
      FULL: this.full
    });
  }
}

export let USER = {
  id: undefined,
  nom: undefined,
  prenom: undefined,
  mail: undefined,
  notifs: [{ content: undefined, link: undefined }],
  get(): void { }
};

@Injectable()
export class VariablesGlobales {
  private JWToken: CustomJWT;
  public apiUrl = 'https://api.job-kiwi.com/v1/';
  public header = new HttpHeaders({ 'Content-Type': 'application/json' });
  private cid = '';
  private cpass = '';
  public user = {
    nom: undefined,
    prenom: undefined,
    mail: undefined,
    password: undefined,
    notifs: [{ content: undefined, link: undefined }],
    profil: undefined
  };
  public gotUser = new EventEmitter();

  public setHeaders(value: string): void {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization : value });
  }
  public getUserFromServer(bool = true): void {
    this.httpClient
      .get<any>(`${this.apiUrl}me`, { headers: this.header })
      .subscribe(
        (response) => {
          this.user.nom = response.NAME;
          this.user.prenom = response.SURNAME;
          this.user.mail = response.MAIL;
          this.user.notifs = JSON.parse(response.NOTIFS);
          this.user.profil = JSON.parse(response.FILES).profil;
          this.gotUser.emit(this.user);
        },
        (error) => {
          const tok = sessionStorage.getItem('token');
          if (tok === null || !bool) {
            this.router.navigate(['auth']);
          }else{
            this.setHeaders(tok);
            this.getUserFromServer(false);
          }
        }
      );
  }
  public getUserToken(mail: string, pass: string, success, failure): void {
    this.httpClient
      .get<any[]>(
        `${this.apiUrl}token?g=a&m=${mail}&p=${pass}&c_id=${this.cid}&c_pass=${this.cpass}`,
        { headers: this.header }
      )
      .subscribe(
        (response) => {
          this.setHeaders('Bearer ' + response);
          success(response);
        },
        (error) => {
          failure(error);
        }
      );
  }
  public getAdsFromServer(tag: string, page: number, otherQuery: string, success, failure): void {
    this.httpClient
      .get<any[]>(
        `${this.apiUrl}ads?a=${tag}&p=${page}${otherQuery}`,
        { headers: this.header }
      )
      .subscribe(
        (response) => {
          success(response);
        },
        (error) => {
          failure(error);
        }
      );
  }

  public getFullAdFS(id, success, failure): void {
    this.httpClient
      .get<any[]>(
        `${this.apiUrl}ads/${id}/full`,
        { headers: this.header }
      )
      .subscribe(
        (response) => {
          success(response);
        },
        (error) => {
          failure(error);
        }
      );
  }
  addStatToAdd(id, v, o = 0, a = null, t = 2500): void {
    const body = JSON.stringify(a ? {
      add: {
        view: v ? 1 : 0,
        open: o ? 1 : 0,
        user: a
      }
    } : {
        add: {
          view: v ? 1 : 0,
          open: o ? 1 : 0
        }
      });
    this.httpClient
      .post<any[]>(
        `${this.apiUrl}ads/${id}/stats`,
        body,
        { headers: this.header, }
      )
      .subscribe(
        (response) => { },
        (error) => {
          setTimeout(() => this.addStatToAdd(id, v, o, a, t * 2), t);
        }
      );
  }
  postUser(body, success, failure): void {
    this.httpClient
      .post<any[]>(
        `${this.apiUrl}users`,
        body,
        { headers: this.header }
      )
      .subscribe(
        (response) => {
          success(response);
        },
        (error) => {
          failure(error);
        }
      );
  }
  constructor(private httpClient: HttpClient, private router: Router) { }

}

@Injectable()
export class RoutingState {
  private history = [];

  constructor(
    private router: Router
  ) { }

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '';
  }
  public goToPreviousUrl(erase = true): void {
    const a = this.getPreviousUrl();
    this.history.pop();
    this.router.navigate([a]);
  }
}
export class CustomJWT {

}
