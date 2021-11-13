import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User, Categoria } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  users:User[] = []
  currentUser:User;
  constructor(private storage: Storage,private http: HttpClient,private toastController: ToastController ) { 
    this.init();
    this.cargarGanadores();
  }

  guardarUser(user:User  ) {   
      this.users.unshift(user)
      this.storage.set('users', this.users)
      this.presentToast('partida guardada','success');
  }

  guardarCurrentUser(user:User) {   
    this.currentUser = user;
    this.storage.set('currentUser', user)
    if(user.nombre != '')
      this.presentToast('partida iniciada','success');
  }

  borrarUsuarios() {
    this.users= []
    this.storage.remove('users')
    this.presentToast('Estadisticas restablecidas', 'danger');
  }

  async init() {
    await this.storage.create();
  }

  async cargarGanadores() {

    const users = await this.storage.get('users')

    if (users != null)
      this.users = users

      return users
  }

  async getCurrentUser() {

    const user = await this.storage.get('currentUser')

    if (user != null)
      this.currentUser = user
  }

  getCategoriasOpts() {
    return this.http.get<Categoria[]>('/assets/data/categorias.json');
  }
  async presentToast(mensaje: string, color:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color,
      duration: 1000
    });
    toast.present();
  }
}
