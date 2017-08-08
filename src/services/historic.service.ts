import { Injectable } from '@angular/core';
import { ToastController, ModalController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ScanData } from '../models/scan-data.model';
import { ModalPage } from '../pages/index.pages';

@Injectable()
export class HistoricService {

  private historic: ScanData[] = [];

  constructor(private toastCtrl: ToastController, private modalCtrl: ModalController, private iab: InAppBrowser) {
  }

  getHistoric():ScanData[] {
    return this.historic;
  }

  addToHistoric(scanDataTxt: string){
    let scanData: ScanData = new ScanData(scanDataTxt);
    this.historic.unshift(scanData);
    this.executeHistoricScan(0);
    console.log(this.historic);
  }

  executeHistoricScan(index:number){
    let data: ScanData = this.historic[index];
    
    switch(data.type){
      case "HTTP":
        this.iab.create(data.info, "_system");
        break;
      case "MAP":
      case "CONTACT":
        this.showModal(data.type, data.info);
        break;
      case "MAIL":
        this.iab.create(ScanData.parseMail(data.info).emailTo(),"_system");
        break;
      default:

    }
  }

  showModal(type: string, info: string){
    let modal = this.modalCtrl.create(ModalPage, { type: type, info: info});
    modal.present();

    modal.onDidDismiss(data => {
      if(data){
        console.log("Result of the modal ["+data+"]");
        this.showToast(data);
      }
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
