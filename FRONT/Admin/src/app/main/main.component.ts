import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  active = 1;
  adsFields: string[];
  usersFields: string[];
  companyFields: string[];
  constructor() {
    this.adsFields = 'ID,Start,Owner,End,Title,Company,Location,Contract,Tags,Salary,View,Open,Applicants,Chats,Preview'.split(',');
    this.usersFields = 'ID,LEVEL,NAME,SURNAME,MAIL,PASSWORD,INTRO,NOTIFS,CONVS,ADS,COMPANY,FILES,VERIFIED'.split(',');
    this.companyFields = 'ID,NAME,TEAM,CONVS,UNPUBLISHED,ADS,WTEAM'.split(',');
  }
  ngOnInit(): void { }
}
