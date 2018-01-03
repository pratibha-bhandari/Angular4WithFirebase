import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map'

import { AuthService } from "../auth.service";
import { AfService } from "../providers/af.service";
import { AlertService } from '../providers/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  titleAlert:string = 'Please enter a valid email';
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  password:string = '';
  email:string = '';
  fullName:string = '';
  error;

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
            // logged in so return true
            //return true;
            this.authService.logout()
            this.authService.redirectUrl = '/dashboard';
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
            // Redirect the user
            this.router.navigate([redirect]);
    }
  }

  constructor(private alertService: AlertService, private fb: FormBuilder, private router:Router, public authService: AuthService, public afService:AfService) {

    this.rForm = fb.group({
      'email' : [null, Validators.email],
      'fullName' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'validate' : ''
    });
  }
  register(registerationForm) {


    this.alertService.clear()
    this.password = registerationForm.password;
    this.email = registerationForm.email;
    this.fullName = registerationForm.fullName;
    this.afService.signUp(this.fullName, this.email, this.password)
    .then(() => {
      this.afService.redirectUrl = '/dashboard';
      let redirect = this.afService.redirectUrl ? this.afService.redirectUrl : '';
      // Redirect the user
      this.router.navigate([redirect]);
      console.log('signup successful');

    }).catch(_error => {
      this.error = _error
      //this.router.navigate(['/'])
      this.alertService.error(this.error.message);

    })
    /*this.afService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.afService.redirectUrl = '/dashboard';
          let redirect = this.afService.redirectUrl ? this.afService.redirectUrl : '';
          // Redirect the user
          this.router.navigate([redirect]);
          console.log('signup successful');

        }).catch(_error => {
          this.error = _error
          //this.router.navigate(['/'])
          this.alertService.error(this.error.message);

        })*/
  }
  goToLogin(){
    this.afService.redirectUrl = '/dashboard';
    let redirect = this.afService.redirectUrl ? this.afService.redirectUrl : '';
    // Redirect the user
    this.router.navigate([redirect]);
  }
}
