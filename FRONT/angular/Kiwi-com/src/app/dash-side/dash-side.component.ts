import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-side',
  templateUrl: './dash-side.component.html',
  styleUrls: ['./dash-side.component.css']
})
export class DashSideComponent implements OnInit {
  notifs = [
    {
      content: 'Alphabet is looking for a new collaborator.',
      link: '#'
    }, {
      content: '25 new jobs for "Angular"',
      link: '#'
    }, {
      content: 'Incoming message from Alphabet',
      link: '#'
    }, {
      content: '42 new jobs for "Front-End"',
      link: '#'
    }, {
      content: 'Amazon is looking for a new collaborator.',
      link: '#'
    }, {
      content: '5 new jobs for "Cybersecurity"',
      link: '#'
    }
  ];
  notifCount = 6;
  constructor() { }

  ngOnInit(): void {
  }

}
