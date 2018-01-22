import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { AuthService } from "../auth.service";
import { User } from "../model/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public user
  constructor(private router: Router, public authService: AuthService) { }
  ngOnInit() {
    console.log("Dashboard");//ihgbhjg
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      console.log("Logout clicked----"+JSON.stringify(this.user));
      console.log("email----"+this.user.email);
      console.log("displayName----"+this.user.displayName);
      //localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
  logout(){
    console.log("Logout clicked");
    this.authService.logout()
    this.authService.redirectUrl = '/login';
    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
    // Redirect the user
    this.router.navigate([redirect]);
  }
  showProfile(){
    console.log("Profile clicked");
    // Redirect the user to profile
    this.router.navigate(['/profile']);
  }
}
