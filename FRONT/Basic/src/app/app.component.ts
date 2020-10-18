import { Component, NgModule, OnInit } from '@angular/core';
// import { $ } from 'protractor';
import { VariablesGlobales, RoutingState } from './var-globales';
import Quill from 'quill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private routingstate: RoutingState){
  }
  ngOnInit(): void{
    this.routingstate.loadRouting();
  }

}
