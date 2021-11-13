import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewgamePageRoutingModule } from './newgame-routing.module';

import { NewgamePage } from './newgame.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewgamePageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewgamePage]
})
export class NewgamePageModule { }
