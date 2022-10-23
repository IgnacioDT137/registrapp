import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite/ngx";
import { AlertController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from '@ionic/storage-angular';
import { AnimationController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private db: SQLiteObject;
  private usuario: string;
  private clave: string;

  constructor(private sqlite: SQLite, private alertControl: AlertController, private router: Router, private storage: Storage, private aniCtrl: AnimationController) {
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
        localStorage.setItem("logueado", "true")
        let extras: NavigationExtras = {
          state: {
            username: this.usuario
          }
        }

        this.router.navigate(["/principal-alumno"], extras)
      } else {
        await this.errorField()
      }
    })
  }

  async errorField() {
    this.aniCtrl.create()
    .addElement(document.querySelectorAll(".campo"))
    .duration(100)
    .iterations(4)
    .fromTo("transform", "translateX(-5px)", "translateX(0px)")
    .fromTo("border", "2px red solid", "1px rgb(104, 98, 98) solid")
    .fromTo("background", "red", "transparent")
    .play()
}

  ngOnInit(): void {
    this.storage.create()
    this.aniCtrl.create()
    .addElement(document.querySelector("#logo"))
    .duration(3000)
    .keyframes([
      {offset: 0.01, transform: "scale(1)", opacity: 0},
      {offset:0.25, transform: "scale(1)", opacity:0.25},
      {offset: 0.5, transform: "scale(1)", opacity: 0.5},
      {offset: 0.75, transform: "scale(1)", opacity: 0.75},
      {offset: 1, transform: "scale(1)", opacity: 1}
    ])
    .play()
  }
}
