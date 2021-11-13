import { Component, OnInit } from '@angular/core';
import { Componente } from '../../interfaces/interfaces';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  componentes: Componente[] = [
    {
      icon: 'balloon-outline',
      name: 'New Game',
      redirectTo: '/newgame'
    },
    {
      icon: 'ice-cream-outline',
      name: 'Score',
      redirectTo: '/score'
    },
    {
      icon: 'options-outline',
      name: 'Options',
      redirectTo: '/options'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
