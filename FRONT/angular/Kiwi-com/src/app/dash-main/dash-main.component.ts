import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
@Component({
  selector: 'app-dash-main',
  templateUrl: './dash-main.component.html',
  styleUrls: ['./dash-main.component.css']
})
export class DashMainComponent implements OnInit {
  ads = [];
  constructor(private httpClient: HttpClient) {
    this.getAdsFromServer();
  }
  tagA = 'all';

  ngOnInit(): void { }
  getAdsFromServer(): void {
    this.httpClient
      .get<any[]>('http://localhost/rest-api/ads.php?lookFor=' + this.tagA)
      .subscribe(
        (response) => {
          this.ads = response;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  onsubmiT(tag: string): void {
    this.tagA = tag;
    this.getAdsFromServer();
    // alert('http://localhost/rest-api/ads.php?lookFor=' + this.tagA);
  }

}
