import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Firestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  form!: FormGroup;
  regEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private firestore: Firestore) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      'email': [null, {validators:[Validators.required, Validators.email], asyncValidators:[this.emailTaken], updateOn: 'change'}],
      'password': [null, {validators:[Validators.required, this.validPassword.bind(this)]}]
    });
  }

  onSignup(){
    this.authService.signup(this.form.value.email, this.form.value.password)
      .then((res)=>{
        if(res == 'success'){
          this.router.navigate(['/movies']);
        }
        else{
          alert(res);
        }
      })
  }

  get email(){
    return this.form.controls['email'];
  }
  get password(){
    return this.form.controls['password'];
  }

  validPassword(control: FormControl): {[s:string]: boolean}|null{
    if(!control.value){
      return null;
    }
    if(!this.regEx.test(control.value)){
      return {'invalidFormat': true};
    }
    return null;
  }

  emailTaken(control: FormControl): Promise<any> | Observable<any>{
    const result = new Promise<any>((resolve, reject)=> {
      setTimeout(()=>{
        if(control.value === "admin@admin.com"){
          resolve({'emailTaken': true})
        }
        else{
          resolve(null);
        }
      }, 1000);
    });
    return result;
  }

}
