import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite/ngx";
import { AlertController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private db: SQLiteObject;
  private usuario: string;
  private clave: string;

  constructor(private sqlite: SQLite, private alertControl: AlertController, private router: Router) {
    this.sqlite.create({
      name: "data.db",
      location: "default"
    })
    .then((db: SQLiteObject) => {
      this.db = db
      db.executeSql("create table alumnos (usuario varchar(32), clave varchar(32))", [])
      .then(() => {db.executeSql("insert into alumnos values(?, ?)", ["fenix", "1234"]).then(()=> {
        db.executeSql("create table justificativo (texto varchar(50))", []).then(() => {
          db.executeSql("create table asistencias (ramo varchar(20), fecha varchar(100))", []).then(() => {
            console.log("Tablas Listas")
          })
        })        
      })})
      .catch((e) => {console.log(e)})
    })
    .catch((e) => {
      console.log(e)
    })
  }

  login() {
    this.db.executeSql("select * from alumnos where usuario = ? and clave = ?", [this.usuario, this.clave]).then(async (data) => {
      if (data.rows.length === 1) {
        let extras: NavigationExtras = {
          state: {
            username: this.usuario
          }
        }

        this.router.navigate(["/principal-alumno"], extras)
      } else {
        const alert = await this.alertControl.create({
          header: "SQLite",
          message: "No hay datos",
          buttons: ['OK']
        })
        await alert.present()
      }
    })
  }
}
