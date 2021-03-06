import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';
import { BookPickup } from '../pages/book-pickup/book-pickup';
import { Events } from '../pages/events/events';
import { MyProfile } from '../pages/my-profile/my-profile';
import { TariffRates } from '../pages/tariff-rates/tariff-rates';
import { UploadLocation } from '../pages/upload-location/upload-location';
import { GetEstimate } from '../pages/get-estimate/get-estimate';

import { AngularFire } from 'angularfire2';
import { AuthData } from '../providers/auth-data';
import { Global } from '../services/global/global';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public authData: AuthData, public statusBar: StatusBar, public splashScreen: SplashScreen, public af: AngularFire) {
    const authObserver = af.auth.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = Login;
        authObserver.unsubscribe();
      }
    });
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Events', component: Events }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut() {
    this.authData.logoutUser().then( authData => {
      this.nav.setRoot(Login);
    });
  }
}
