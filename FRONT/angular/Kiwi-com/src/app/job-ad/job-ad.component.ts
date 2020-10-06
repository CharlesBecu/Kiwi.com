import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-ad',
  templateUrl: './job-ad.component.html',
  styleUrls: ['./job-ad.component.css']
})
export class JobAdComponent implements OnInit {

  @Input() id: number;
  @Input() titre: string;
  @Input() entreprise: string;
  @Input() lieu: string;
  primaryTag = [];
  secondaryTag = [];
  @Input() salaire: string;
  @Input() preview: string;
  constructor() { }

  ngOnInit(): void {
  }

}
