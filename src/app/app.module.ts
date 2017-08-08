import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AgmCoreModule } from '@agm/core';
import { Contacts } from '@ionic-native/contacts';

import { MyApp } from './app.component';
import { TabsPage, HomePage, HistoricPage, ModalPage } from '../pages/index.pages';

import { HistoricService } from '../services/historic.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    HistoricPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDj1VnMf4elF-J502qh0rI3Nzw65ForkYY'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    HistoricPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    Contacts,
    HistoricService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
