import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

import { ScanData } from '../../models/scan-data.model';
import { Coords } from '../../models/coords.model';
import { ContactData } from '../../models/contact-data.model';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  title: string = "Modal";

  //Map Data
  showMap: boolean = false;
  coords: Coords;

  //Contact Info
  showContact: boolean = false;
  contact: ContactData;

  constructor(private platform: Platform, private navParams: NavParams, private viewCtrl: ViewController, private contacts: Contacts) {
    let type = this.navParams.get('type');
    let info = this.navParams.get('info');

    this.initData(type, info);
  }

  initData(type: string, info: string){
    switch(type){
      case 'MAP':
        console.log("Show map info")
        this.title = "Map";
        this.showMap = true;
        this.coords = ScanData.parseCoords(info);
        console.log(this.coords);
        break;

      case "CONTACT":
        console.log("Show contact info");
        this.title = "Contact";
        this.showContact = true;
        this.contact = ScanData.parseContact(info);
        console.log(this.contact);
        break;

      default:
    }
  }

  saveContactInTerminal(){
    if(this.showContact){
      if(!this.platform.is('cordova')){
        console.warn("Code not executed in terminal, exit without save");
        let message: string = "Contact "+this.contact.fullName+" created!!";
        this.closeModal(message);
        return;
      }
      
      let contact: Contact = this.contacts.create();

      contact.name = new ContactName(null, this.contact.fullName);
      contact.phoneNumbers = [];
      this.contact.phones.forEach(element => {
        contact.phoneNumbers.unshift(new ContactField('mobile', element));
      });
      contact.emails = [];
      this.contact.emails.forEach(element => {
        contact.emails.unshift(new ContactField('email', element));
      });
      contact.addresses = [];
      this.contact.directions.forEach(element => {
        contact.addresses.unshift(new ContactField('address', element));
      });
      contact.save().then(
        () => {
          console.log('Contact saved!', contact);
          let message: string = "Contact "+this.contact.fullName+" created!!";
          this.closeModal(message);
        },
        (error: any) => console.error('Error saving contact.', error)
      );
    }
    

  }

  closeModal(message?: string){
    if(message){
      this.viewCtrl.dismiss(message);
    }else{
      this.viewCtrl.dismiss();
    }
    
  }

}
