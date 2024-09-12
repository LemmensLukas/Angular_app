import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import { Router} from "@angular/router";
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  id: string = "";
  userActivated = new Subject<string | null>;



  constructor(private router: Router, private auth: Auth) {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }
  }
  login(email: string, passwd: string){
    return signInWithEmailAndPassword(this.auth, email, passwd)
      .then(()=>{
        return this.auth.currentUser?.getIdToken()
          .then(
            (token: string) => {
              this.token = token;
              localStorage.setItem('username', email);
              localStorage.setItem('token', token);
              return true;
            }
          );
      })
      .catch(
        error => {
          console.log(error);
          return false;
        }
      )

  }

  signup(email: string, passwd: string): Promise<string>{
    return createUserWithEmailAndPassword(this.auth, email, passwd)
      .catch(error => {
        console.log(error);
        return error;
      })
      .then(()=>{
        console.log('success');
        return 'success';
      })
  }

  isLoggedIn(): boolean{
    return this.token != null;
  }

  logout(): void {
    this.auth.signOut();
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['login']);
  }
  getUid(){
    return this.auth.currentUser?.uid;
    /*if(this.auth.currentUser){
      return this.auth.currentUser.uid;
    }
    else{
      return null
    }*/
  }
  activateUser(email: string | null){
    this.userActivated.next(email);
  }

  getEmails(){
    if(this.auth.currentUser){
      return this.auth.currentUser.email;
    }
    else{
      return ""
    }
  }

}
