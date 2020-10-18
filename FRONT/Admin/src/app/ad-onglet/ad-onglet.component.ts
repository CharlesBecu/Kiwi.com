import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-ad-onglet',
  templateUrl: './ad-onglet.component.html',
  styleUrls: ['./ad-onglet.component.css']
})
export class AdOngletComponent implements OnInit {
  @Input() name: string;
  @Input() route: string;
  ads: any[];
  p: number;
  loading: boolean;
  constructor(private httpClient: HttpClient) {
    this.p = 1;
    this.ads = [];
    this.loading = false;
  }
  previous(): void {
    if (this.p > 1 && this.loading === false) {
      this.p--;
      this.request();
    }
  }
  next(): void {
    if (this.loading === false) {
      this.p++;
      this.request();
    }
  }
  show(a): void {
    alert(a);
  }
  values(a: object): any[] {
    return Object.values(a);
  }
  ngOnInit(): void {
    this.request();
  }
  request(): void {
    this.loading = true;
    this.httpClient
      .get<any[]>(
        `https://api.job-kiwi.com/v1/admin/${this.route}?p=${this.p}`,
        { headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token') }) }
      )
      .subscribe(
        (response) => {
          const prev = [];
          response.forEach(el => {
            prev.push(el);
          });
          this.ads = prev;
          this.loading = false;
        },
        (error) => {
          alert(`No more ${this.route} to display`);
          this.p--;
          this.loading = false;
        }
      );
  }

}
