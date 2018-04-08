import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  public globalArray: any = [];



  constructor(public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController) {
    this.storage.get('myjson').then((val => {
      this.globalArray = JSON.parse(val);
    }));
  }

  addTask(): void {
    let alert = this.alertCtrl.create({
      title: 'Nueva Tarea',
      message: 'Que deseas hacer?',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'descripcion'
        },
        {
          name: 'fecha',
          type: 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: (data: any) => {


            this.globalArray.push({ 'nombre': data.nombre, 'fecha': data.fecha });


            this.storage.set('myjson', JSON.stringify(this.globalArray));


            this.storage.get('myjson').then((val => {
              console.log("deberia estar igual que el array anterior " + JSON.parse(val));
            }));
          }
        }
      ]
    });
    alert.present();
  }


  ionViewDidEnter() {
    this.storage.get('myjson').then((val => {
      this.globalArray = JSON.parse(val);
    }));
  }
}