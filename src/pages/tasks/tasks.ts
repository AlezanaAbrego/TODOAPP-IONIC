import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatePickerDirective } from 'ion-datepicker';


@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
  providers: [DatePickerDirective],
})


export class TasksPage {

  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;

  public datos: any;

  public globalArray: any = [];

  public localDate: Date = new Date();
  public initDate: Date = new Date();
  public initDate2: Date = new Date(2015, 1, 1);
  public disabledDates: Date[] = [new Date(2017, 7, 14)];
  public localeString = {
    monday: true,
    weekdays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  };
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
  public min: Date = new Date()


  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  public Log(stuff): void {
    this.datepicker.open();
    this.datepicker.changed.subscribe(() => console.log('test'));
    console.log(stuff);
  }

  public event(data: Date): void {
    this.localDate = data;
    console.log(data);
  }

  public setDate(date: Date) {
    console.log(this.initDate);
    this.initDate = date;
    console.log(this.initDate);
  }

  public closeDatepicker() {
    this.datepicker.modal.dismiss();
  }


  public newItem(){
   // this.datos.nombre, this.initDate.getDate.toString();
    this.storage.get('myjson').then((val => {
      this.globalArray.push(val);
      console.log("valor del myjson "+val);
    }));

    this.globalArray.push(this.datos);


    this.storage.set('myjson', this.globalArray);

    console.log(this.globalArray);
   
  }

  ngOnInit(){
    console.log(this.datos);

  }
}