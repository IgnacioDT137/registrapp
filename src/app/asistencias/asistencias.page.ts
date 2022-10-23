import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  private db: SQLiteObject;

  registros = [];

  constructor(private sqlite: SQLite) { 
    this.sqlite.create({
      name: "data.db",
      location: "default"
    }).then((db:SQLiteObject)=>{
      this.db = db
    }).catch((e) => console.log(e))
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.listar()
  }

  listar(){
    this.db.executeSql("SELECT * FROM asistencias", []).then((data) =>{
      this.registros = []
      for(let i = 0; i < data.rows.length; i++){
        this.registros.push(data.rows.item(i))
      }
    }).catch((e) => {
      console.log(e)
    })
  }

}
