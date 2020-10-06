import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-bar-de-recherche-styleeee',
  templateUrl: './bar-de-recherche-styleeee.component.html',
  styleUrls: ['./bar-de-recherche-styleeee.component.css']
})

export class BarDeRechercheStyleeeeComponent implements OnInit {
  // tslint:disable-next-line: no-output-native
  @Output() submiT = new EventEmitter<string>();
  A = 'all';
  B = '';
  constructor() { }

  ngOnInit(): void { }
  inputA(a: string): void{
    this.A = a;
  }
  inputB(a: string): void{
    this.B = a;
  }
  submitForm(): void{
    // alert(this.A);
    this.submiT.emit(this.A === null ? 'all' : this.A === '' ? 'all' : this.A);
  }
}
