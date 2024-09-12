import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  invalidLogin: boolean = false;

  @Output() boolEmitter = new EventEmitter <boolean>;
  email: string | null = "";
  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.invalidLogin = false;
  }
  onLogin(form: NgForm){
    const email = form.value.email;
    const password = form.value.passwd;
    this.authService.login(email, password)
      .then((response) => {
        if(!response){
          this.invalidLogin = true;
          this.boolEmitter.emit(true);
        }
        else{
          this.invalidLogin = false;
          this.boolEmitter.emit(false);
          this.email = localStorage.getItem('username');
          this.authService.activateUser(this.email);
          this.router.navigate(['movies']);
        }
      })
  }

  goTo(){
    this.router.navigate(['signup']);
  }


}
