import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { VariablesGlobales } from 'src/app/var-globales';

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
  @Input() type: string;
  @Input() tags: [string];
  @Input() salaire: string;
  @Input() preview: string;
  @Output() openAd = new EventEmitter<number>();
  @Input()
  get main(): number { return this.MAIN; }
  set main(main: number) {
    this.MAIN = main;
    if (this.preview !== undefined && this.id !== undefined && this.state !== undefined) {
      if (this.MAIN === this.id) {
        this.display = this.preview.substr(0, 700);
        this.state = true;
      } else {
        this.display = this.preview.substr(0, 250) + '...';
        this.state = false;
      }
    }
  }
  private MAIN: number;
  display: string;
  state = false;

  constructor(private p: VariablesGlobales) {
  }

  ngOnInit(): void {
    this.display = this.preview.substr(0, 250) + '...';
    this.state = false;
  }
  toggleDisplay(): void {
    if (!this.state) {
      this.p.addStatToAdd(this.id, 1);
    }
    this.openAd.emit(this.state ? -1 : this.id);
  }
}
