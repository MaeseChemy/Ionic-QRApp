import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ToastController, Platform } from 'ionic-angular';

import { HistoricService } from '../../services/historic.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private platform: Platform, private historicSrv: HistoricService) {
   
  }


  scan(){
    console.log("Doing Scan!!");
    if(!this.platform.is('cordova')){
      //this.historicSrv.addToHistoric("http://google.es");
      //this.historicSrv.addToHistoric("geo:51.678418,7.809007");
      /*
      this.historicSrv.addToHistoric( `BEGIN:VCARD
VERSION:3.0
N:Kent;Clark
FN:Clark Kent
ORG:Home
TITLE:Director
ADR:;;Calle;Pepito;Madrid;28924;España
TEL;WORK;VOICE:699854949
TEL;CELL:655974964
TEL;FAX:1231231
EMAIL;WORK;INTERNET:pepito@clavito.com
URL:home.org
BDAY:10/01/2001
END:VCARD` );
      */
      this.historicSrv.addToHistoric("MATMSG:TO: email@ejemplo.com;SUB:Asunto del email;BODY:Texto del email.;;");
      return;
    }
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log("Success reading QR!");
      console.log("Result: " + barcodeData.text);
      console.log("Format: " + barcodeData.format);
      console.log("Cancelled: " + barcodeData.cancelled);

      if(!barcodeData.cancelled){
        this.historicSrv.addToHistoric(barcodeData.text);
      }

    }, (err) => {
        // An error occurred
        console.error("Error reading QR ["+err+"]");
        this.showToast("Error reading QR ["+err+"]");
    });
  }

  showToast(message: string, closeButton: boolean = false){
    let toast = this.toastCtrl.create({
      message: message,
      position: 'middle'
    });
    if(closeButton){
      toast.setShowCloseButton(closeButton);
    }else{
      toast.setDuration(3000);
    }
    toast.present();
  }
}
