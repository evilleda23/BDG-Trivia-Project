import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  users:User[]=[]
  constructor(public dataLocalService:DataLocalService) { }
  timer:string = ''
  tiempoU:string[]=[];
  async ngOnInit() {
    await this.getUsers();
    if(this.users){
      this.Sortbytime();
      this.MostrarTiempo();}
  }

  async getUsers(){
    this.users = await this.dataLocalService.cargarGanadores();
  }

  MostrarTiempo(){
   
    this.users.forEach(element => {
      this.tiempoU.push(this.convertirSeg(element.tiempo))
    });
  }

  convertirSeg(timer) {
    
    let segundos = Math.round(timer % 60);
    let minutos  = Math.floor(timer / 60 ) % 60;
    if(minutos < 10){
      this.timer = '0' + minutos.toString();
    }else{
      this.timer =minutos.toString();
    }
    this.timer+= ':'
    if(segundos < 10){
      this.timer += '0' + segundos.toString();
    }else{
      this.timer +=  segundos.toString();
    }
    const Stime = this.timer;
  return Stime
  }
  Sortbytime(){
  this.users.sort(((a, b) => b.acertadas - a.acertadas) && ((a, b) => b.acertadas - a.acertadas)) 
  }

}
