import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-justificativo',
  templateUrl: './justificativo.page.html',
  styleUrls: ['./justificativo.page.scss'],
})
export class JustificativoPage implements OnInit {

  inasistencia: string = ""

  private db: SQLiteObject

  constructor(private toastController: ToastController, private sqlite: SQLite) { 
    this.sqlite.create({
      name: "data.db",
      location: "default"
    }).then((db:SQLiteObject)=>{
      this.db = db
    }).catch((e) => console.log(e))
  }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Enviado!',
      duration: 3000,
      color: "success"
    });

    await toast.present();
  }


  enviar() {
    this.inasistencia = ""
    this.presentToast()
  }

  justificativo(){
    this.db.executeSql("INSERT INTO JUSTIFICATIVO VALUES (?)", [this.inasistencia])
    .then(() => {
      console.log("Justificativo enviado")
      this.enviar()
    }).catch((e) => {
      console.log(e)
    })

    this.db.executeSql("SELECT * FROM JUSTIFICATIVO", [])
    .then((data) => {
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          const element = data.rows.item(i);
          console.log(element)
        }
      } else {
        console.log("no hay datos")
      }
    }).catch((e) => {
      console.log(e)
    })
  }

}
