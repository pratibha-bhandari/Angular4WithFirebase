import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router'
import { routes }    from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  titleAlert:string = 'Please enter a valid email';
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  password:string = '';
  email:string = '';

  activeLinkIndex = -1;
  routeLinks: any[];

  ngOnInit(): void {
        this.router.events.subscribe((res) => {
            this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
        });
    }

    constructor(private fb: FormBuilder, private router:Router) {

      this.routeLinks = [
            {
                label: 'Sign Up',
                link: './registration',
                index: 0
            }, {
                label: 'Login',
                link: './login',
                index: 1
            }
        ];

      this.rForm = fb.group({
        'email' : [null, Validators.email],
        'password' : [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        'validate' : ''
      });
    }
    login(loginForm) {
      this.password = loginForm.password;
      this.email = loginForm.email;
      this.router.navigate(['dashboard']);
    }

}
