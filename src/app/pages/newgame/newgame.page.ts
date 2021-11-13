import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { User, Categoria, Quiz } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { TriviaService } from '../../services/trivia.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.page.html',
  styleUrls: ['./newgame.page.scss'],
})
export class NewgamePage implements OnInit {
  //currentdate: string = new Date().toISOString();
  user: User = {
    nombre: '',
    categoria: null,
    tiempo: 0,
    acertadas: 0
  }
  idPregunta: number = 0;
  categorias: Categoria[];
  preguntas:Quiz[]=[];
  startGame :boolean = false;
  waiting :boolean = false;
  respuestas: any[];
  constructor( private toastController: ToastController, private triviaService:TriviaService,public datalocalService: DataLocalService, public alertControler:AlertController,public router: Router) { }

  ngOnInit() {
      //Se obtienen las categorias para mostrarlas
      this.init();
      this.datalocalService.getCategoriasOpts().subscribe(resp=>{
      this.categorias = resp});
  }
  timer:string = '00:00'
  time: number = 0;
  interval;

startTimer() {
    this.interval = setInterval(() => {
      this.time++
      this.convertirSeg(this.time)
    },1000)
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

}
  async onSubmit( formulario: NgForm ) {
    if(this.user.categoria.nombre!=''){
      this.waiting = true
      await this.getQuestions();
      this.waiting = false
      this.startGame = true
      this.startTimer()
      formulario.resetForm;
    }else{
      this.presentToast()
    }
  }
  getItem(event){
    this.user.categoria = this.categorias.find(cat => cat.nombre === event.detail.value);
  }

  async getQuestions(){
      this.preguntas= await this.triviaService.getCategory(this.user.categoria.url)
      this.respuestas = [];
      this. generateArrayAnswers()
      
  }
  isCorrect(){
  (this.user.acertadas++) ;
  }

  nextQuestion(){
      this.idPregunta++
      this.respuestas = [];
      if(this.idPregunta ===20){
        clearInterval(this.interval);
        this.user.tiempo = this.time
        this.presentAlertConfirm();
      }else{
        this. generateArrayAnswers()
      }
    } 

    generateArrayAnswers(){
      for (let index = 0; index < this.preguntas[this.idPregunta].incorrectAnswers.length; index++) {
        const element = this.preguntas[this.idPregunta].incorrectAnswers[index];
        if(index<5){
          this.respuestas.push(element)
        }
      }
      this.respuestas.push(this.preguntas[this.idPregunta].correctAnswer);
        this.shuffle(this.respuestas)
    }

    shuffle(array:any[]) {
      let currentIndex = array.length,  randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }

    init(){
      this.timer = '00:00'
      this.time= 0;
      this.idPregunta = 0;
      this.startGame = false;
      this.waiting= false;
      this.respuestas = [];
      this.user = {
        nombre: '',
        categoria: null,
        tiempo: 0,
        acertadas: 0
      }
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: "Ingresa una categoria porfavor",
        duration: 1000,
        color: "primary"
      });
      toast.present();
    }


    async presentAlertConfirm() {
      const alert = await this.alertControler.create({
        header: 'Terminaste!',
        message: `Felicidades, has obtenido <strong>${this.user.acertadas}</strong> correctas!!!`,
        buttons: [
        {
          text: 'Okay',
          handler: () => {
              this.datalocalService.guardarUser(this.user)
              this.router.navigate(['/index']);
            }
          }
        ]
      });
      await alert.present();
    }
  }

  
  
  
  
  