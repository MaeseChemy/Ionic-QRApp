import { Component } from '@angular/core';

import { ScanData } from '../../models/scan-data.model';

import { HistoricService } from '../../services/historic.service';

@Component({
  selector: 'page-historic',
  templateUrl: 'historic.html',
})
export class HistoricPage {

  historic: ScanData[] = [];

  constructor(private historicSrv: HistoricService) {
  }

  ionViewDidLoad(){
    this.historic = this.historicSrv.getHistoric();
  }

  executeScanTask(index:number){
    this.historicSrv.executeHistoricScan(index);
  }
}
