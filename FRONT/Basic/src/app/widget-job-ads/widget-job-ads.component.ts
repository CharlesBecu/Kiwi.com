import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-job-ads',
  templateUrl: './widget-job-ads.component.html',
  styleUrls: ['./widget-job-ads.component.css']
})
export class WidgetJobAdsComponent implements OnInit {
  @Input() indexWidget: string;
  constructor() { }

  ngOnInit(): void {
  }

}
