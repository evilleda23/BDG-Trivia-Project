import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Quiz, Awnser } from '../../interfaces/interfaces';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss'],
})
export class PreguntaComponent implements OnInit {
@Input() pregunta:Quiz;
@Input() respuestas:any[];
@Output() nextQ = new EventEmitter();
@Output() acertada = new EventEmitter();

  constructor() { 
  
  }

  ngOnInit() {
  }

  onClick(resp:string){
    if(this.isCorrect(resp)){

      this.acertada.emit();
    }
    this.nextQ.emit();
  }
  isCorrect(resp:string){
    if(resp === this.pregunta.correctAnswer)
      return true
   return false
  }
}
