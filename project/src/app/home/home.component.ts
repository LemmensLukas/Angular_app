import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  //uid: string | null = "";
  //email: string | null = "";
  constructor(private auth_service: AuthService) {
  }

  ngOnInit(): void {
    //this.checkAuth();
  }

  /*checkAuth(){
    this.uid = this.auth_service.getEmail();
    this.email = this.auth_service.getEmail();
    console.log("id: " + this.uid);
    console.log("email: " + this.email);
  }*/

}
