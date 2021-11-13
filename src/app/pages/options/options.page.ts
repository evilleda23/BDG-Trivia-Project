import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  constructor(public dataLocalService:DataLocalService,public alertController: AlertController) { }


  ngOnInit() {
  }
  deleteUsers(){
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Deseas restablecer las estadisticas!',
      //message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Confirmar',
          handler: () => {
            this.dataLocalService.borrarUsuarios();
          }
        }
      ]
    });

    await alert.present();
  }
}
