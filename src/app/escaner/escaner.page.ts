import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage implements OnInit {

  constructor(private alertCtrl: AlertController) { }

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
        header: 'Alert',
        subHeader: 'Important message',
        message: result.content,
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }

}
