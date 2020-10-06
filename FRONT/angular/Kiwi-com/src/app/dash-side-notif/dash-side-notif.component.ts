import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-side-notif',
  templateUrl: './dash-side-notif.component.html',
  styleUrls: ['./dash-side-notif.component.css']
})
export class DashSideNotifComponent implements OnInit {
  @Input() content: string;
  @Input() link: string;
  constructor() { }

  ngOnInit(): void {
  }

}
