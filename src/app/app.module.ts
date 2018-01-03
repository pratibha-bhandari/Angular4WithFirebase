import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule }     from './app-routing.module';
import { AuthService }     from './auth.service';
import { AfService }     from './providers/af.service';
import { RegistrationComponent } from './registration/registration.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';

// import alert service and component
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './providers/alert.service';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyC-tCnw6pxH8K7kGFiQa5c-Mjaii7A_sB0',
  authDomain: 'angularwepapp.firebaseapp.com',
  databaseURL: 'https://angularwepapp.firebaseio.com',
  storageBucket: 'angularwepapp.appspot.com',
  messagingSenderId: '644814718994'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [AuthService, AfService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
