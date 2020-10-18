import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VariablesGlobales, Ads } from '../var-globales';


// @Injectable()
@Component({
  selector: 'app-dash-main',
  templateUrl: './dash-main.component.html',
  styleUrls: ['./dash-main.component.css']
})
export class DashMainComponent implements OnInit {
  ads = [];
  tagA = 'all';
  loading = false;
  displayed = 1;
  filter = '';
  more = true;
  main = -1;
  constructor(private httpClient: HttpClient, private p: VariablesGlobales) {
    this.p.getAdsFromServer(
      this.tagA, this.displayed, '&n' + this.filter,
      (response) => {
        this.ads = [];
        response.forEach(element => {
          this.ads.push(new Ads(element));
        });
        this.loading = false;
        this.more = true;
      },
      (error) => {
        this.loading = false;
      });
  }


  ngOnInit(): void { }

  onsubmiT(tag: string): void {
    this.displayed = 1;
    this.tagA = tag;
    setTimeout(() => this.p.getAdsFromServer(
      this.tagA, this.displayed, '&n' + this.filter,
      (response) => {
        this.ads = [];
        response.forEach(element => {
          this.ads.push(new Ads(element));
          this.more = true;
        });
      },
      (error) => {
      }), 200);
  }
  open(id: number): void{
    this.main = id;
  }
  getMoreAds(): void {
    if ( this.more ){
    this.loading = true;
    this.displayed += 1;
    setTimeout(() => this.p.getAdsFromServer(
      this.tagA, this.displayed, '&n' + this.filter,
      (response) => {
        response.forEach(element => {
          this.ads.push(new Ads(element));
        });
        this.loading = false;
      },
      (error) => {
        console.log('no more');
        this.displayed -= 1;
        this.more = false;
        this.loading = false;
    }), 200);
  }
  }

}
