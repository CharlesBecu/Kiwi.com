import { Component, OnInit } from '@angular/core';
import { VariablesGlobales } from '../var-globales';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dash-side',
  templateUrl: './dash-side.component.html',
  styleUrls: ['./dash-side.component.css']
})
export class DashSideComponent implements OnInit {
  notifs = [
    {
      content: 'Nothing for now',
      link: '#'
    }
  ];
  notifCount = 0;
  nom: string;
  prenom: string;
  profil = 'https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png';
  user: Subscription;
  constructor(private p: VariablesGlobales) {
    this.set();
    this.user = p.gotUser.subscribe(
      () => this.set()
    );
  }

  ngOnInit(): void {
  }
  set(): void {
    this.nom = this.p.user.nom;
    this.prenom = this.p.user.prenom;
    this.profil = this.p.user.profil;
    this.notifs = this.p.user.notifs.length <= 0 ? this.notifs : this.p.user.notifs;
    this.notifCount = this.p.user.notifs.length;
  }

}
