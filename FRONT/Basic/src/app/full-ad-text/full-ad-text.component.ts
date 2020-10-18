import { Component, OnInit, Input } from '@angular/core';
import Quill from 'quill';
import { VariablesGlobales } from '../var-globales';


@Component({
  selector: 'app-full-ad-text',
  templateUrl: './full-ad-text.component.html',
  styleUrls: ['./full-ad-text.component.css']
})
export class FullAdTextComponent implements OnInit {
  @Input() id: number;
  fullAdText: Quill;
  constructor(private p: VariablesGlobales) { }

  ngOnInit(): void {
    this.fullAdText = new Quill('.quill');
    this.fullAdText.setContents(JSON.parse('{"ops":[{"insert":"Chargement en cours..."}]}'));
    this.fullAdText.disable();

    this.p.getFullAdFS(this.id,
      (response) => {
        this.p.addStatToAdd(this.id, 1);
        this.fullAdText.setContents(JSON.parse(response.FULL));
      },
      (error) => {
        this.fullAdText.setContents(JSON.parse('{"ops":[{"insert":"Sory, we can\'t find this ad anymore. It may have been deleted."}]}'));
      });
  }

}

// .replace(/\n/g, '\\n')
