import {Injectable} from "@angular/core";
import { Router} from '@angular/router'

import { NgModule, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import {AngularFireAuth} from 'angularfire2/auth';
import { User } from '../model/user';

@Injectable()
export class AfService {
  authState: any = null;
  isLoggedIn: boolean = false;
  url:string = '';
  redirectUrl:string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }
  signUp(name: string, email: string, password: string) {
    console.log('name -- '+name);
    console.log('email -- '+email);
    console.log('signUp called');

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.afAuth.auth
        this.authState = user
        this.isLoggedIn = true;
        console.log('response'+user);
        let u = new User();//response.json();
        u.email = email;
        u.displayName = name;
        console.log('data: '+JSON.stringify(u));
        // User created now create the database user
        return user.updateProfile({
          displayName: name
        }).then(function() {
          console.log("updateProfile success");
          if (u) {
            //logged in between page refreshes

            console.log("user saved successfully");
            localStorage.setItem('currentUser', JSON.stringify(u));
            //localStorage.setItem('currentUser', email);
          }
        }, function(error) {
          console.log("updateProfile", error);
        });
            /*return this.af.database.object(`/users/${user.uid}`).update({
                name: "Pratibha",
                surname: "Bhandari"
            });*/
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
  /*signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.afAuth.auth
        this.authState = user
        this.isLoggedIn = true;
        console.log('response'+user);
        let u = new User();//response.json();
        u.email = email;
        console.log('data: '+JSON.stringify(u));
        // User created now create the database user
        return user.updateProfile({
          displayName: "Superman"
        }).then(function() {
          console.log("updateProfile success");
          if (u) {
            //logged in between page refreshes

            console.log("user saved successfully");
            localStorage.setItem('currentUser', JSON.stringify(u));
            //localStorage.setItem('currentUser', email);
          }
        }, function(error) {
          console.log("updateProfile", error);
        });
            /*return this.af.database.object(`/users/${user.uid}`).update({
                name: "Pratibha",
                surname: "Bhandari"
            });*/
      /*})
      .catch(error => {
        console.log(error)
        throw error
      });
  }*/

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        let u = new User();//response.json();
        u.email = user.email;
        u.displayName = user.displayName;
        console.log("user - "+user.displayName);
        console.log('data: '+JSON.stringify(u));
        if (u) {
          //logged in between page refreshes
          this.isLoggedIn = true;
          localStorage.setItem('currentUser', JSON.stringify(u));
          //localStorage.setItem('currentUser', email);
        }
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }

}
