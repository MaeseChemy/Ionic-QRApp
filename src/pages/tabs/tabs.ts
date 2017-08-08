import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage, HistoricPage } from '../index.pages';
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home: any;
  historic: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.home = HomePage;
    this.historic = HistoricPage;
  }

}
