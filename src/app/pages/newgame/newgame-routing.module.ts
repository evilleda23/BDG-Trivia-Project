import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewgamePage } from './newgame.page';

const routes: Routes = [
  {
    path: '',
    component: NewgamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewgamePageRoutingModule {}
