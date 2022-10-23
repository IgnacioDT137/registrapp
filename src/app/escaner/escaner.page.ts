import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage implements OnInit {

  private db: SQLiteObject;

  constructor(private alertCtrl: AlertController, private sqlite: SQLite) { 
    this.sqlite.create({
      name: "data.db",
      location: "default"
    }).then((db:SQLiteObject)=>{
      this.db = db
    }).catch((e) => console.log(e))
  }

  ngOnInit() {
  }

  async detener() {
    BarcodeScanner.showBackground()
    BarcodeScanner.stopScan()
    document.querySelector('body').classList.remove('scanner-active');
  }

  async leerQR() {
    document.querySelector('body').classList.add('scanner-active');

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();
  
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      const alert = await this.alertCtrl.create({
        header: 'Asistencia Registrada',
        subHeader: 'Asignatura:',
        message: result.content,
        buttons: ['OK'],        
      });

      const fechaDate = new Date()

      const fechaString = fechaDate.toISOString().substring(0, 10); //yyyy-mm-dd

      this.db.executeSql("INSERT INTO asistencias VALUES(?, ?)", [result.content, fechaString]).then(async () => {
        await alert.present();
      })
    
    }
  }

}
