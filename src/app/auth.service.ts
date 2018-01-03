import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/delay';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './model/user';
@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  url:string = '';
  redirectUrl:string = '';
  constructor(private http: Http) { }
  login(email : string, password : string){
    /*return this.http.post('http://localhost:8080/ui/api/login/'+username, this.loginObject)
              .map((response: Response) => {
                console.log('response'+response);
                  let user = response.json();
                  if (user) {

                     //logged in between page refreshes
                     this.isLoggedIn = true;
                     localStorage.setItem('currentUser', JSON.stringify(user));
                  }
               });*/
    this.url = "http://echo.jsontest.com/key/value/one/two";
    return this.http.get(this.url).map((response: Response) => {
          console.log('response'+response);
          let user = new User();//response.json();
          user.email = email;
          console.log('data: '+JSON.stringify(user));
          if (user) {
            //logged in between page refreshes
            this.isLoggedIn = true;
            localStorage.setItem('currentUser', JSON.stringify(user));
            //localStorage.setItem('currentUser', email);
          }
        });

  }
  register(fullName : string, email : string, password : string){

    this.url = "http://echo.jsontest.com/key/value/one/two";
    return this.http.get(this.url).map((response: Response) => {
          console.log('response'+response);
          let user = new User();//response.json();
          user.email = email;
          console.log('data: '+JSON.stringify(user));
          if (user) {
            //logged in between page refreshes
            this.isLoggedIn = true;
            localStorage.setItem('currentUser', JSON.stringify(user));
            //localStorage.setItem('currentUser', email);
          }
        });

  }
  logout(): void {
               this.isLoggedIn = false;
               localStorage.removeItem('currentUser');
  }
}
