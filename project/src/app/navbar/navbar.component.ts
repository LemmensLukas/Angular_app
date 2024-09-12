import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  user: string | null = "";
  constructor(private auth_service: AuthService) {
  }
  ngOnInit(): void {
    this.auth_service.userActivated.subscribe({
      next:(email: string|null)=>{
        this.user = email
        //console.log(this.user)
      }
    })
    this.user = localStorage.getItem('username');
  }
  onLogout(): void {
    this.auth_service.logout();
  }
  get authService(){
    return this.auth_service;
  }

  ngOnDestroy(): void {
    if(this.auth_service.userActivated){
      this.auth_service.userActivated.unsubscribe();
    }
  }


}
