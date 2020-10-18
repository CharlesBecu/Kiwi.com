import { Component, OnInit } from '@angular/core';
import { RoutingState } from '../var-globales';
import { Subscription } from 'rxjs';
import { VariablesGlobales } from '../var-globales';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-ad-page',
  templateUrl: './full-ad-page.component.html',
  styleUrls: ['./full-ad-page.component.css']
})
export class FullAdPageComponent implements OnInit {
  rpm: Subscription;
  id: number;
  constructor(public history: RoutingState, private p: VariablesGlobales, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rpm = this.route.params.subscribe(params => {
      this.id = params.ID;
    });
  }

}
