import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { VariablesGlobales } from 'src/app/var-globales';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  mail = 'nuiro.emmanuel@orange.fr'; // document.cookie | localStrorage
  password = 'EN051100';
  constructor(private p: VariablesGlobales) { }
  ngOnInit(): void {
    this.p.getUserFromServer();
  }
}
