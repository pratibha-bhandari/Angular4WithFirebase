import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  public user
  constructor() { }

  ngOnInit() {
    console.log("Contact us");//ihgbhjg
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      console.log("Logout clicked----"+JSON.stringify(this.user));
      console.log("email----"+this.user.email);
      console.log("displayName----"+this.user.displayName);
      //localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
  sendEmail(){
    console.log("send email clicked");
    console.log("email----"+this.user.email);
    console.log("displayName----"+this.user.displayName);
  }
}
