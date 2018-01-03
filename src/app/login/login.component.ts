import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map'

import { AuthService } from "../auth.service";
import { AfService } from "../providers/af.service"
import { AlertService } from '../providers/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  title = 'app';
  titleAlert:string = 'Please enter a valid email';
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  password:string = '';
  email:string = '';
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

  constructor(private alertService: AlertService, private fb: FormBuilder, private router:Router, public authService: AuthService, public afService: AfService) {

    this.rForm = fb.group({
      'email' : [null, Validators.email],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'validate' : ''
    });
  }
  login(loginForm) {
    this.alertService.clear()
    this.password = loginForm.password;
    this.email = loginForm.email;

    this.afService.loginWithEmail(this.email, this.password).then(() => {
      this.authService.redirectUrl = '/dashboard';
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
      // Redirect the user
      this.router.navigate([redirect]);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
          //this.router.navigate(['/'])
          this.alertService.error(this.error.message);
        }
      });


    //this.router.navigate(['dashboard']);
    //this.alertService.error(this.error.message);

    /*this.authService.login(this.email, this.password).subscribe(data => {
      console.log(this.email);
      // this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        this.authService.redirectUrl = '/dashboard';
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });*/
  }
  goToRegistration(){
    this.authService.redirectUrl = '/registration';
    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
    // Redirect the user
    this.router.navigate([redirect]);
  }

}
