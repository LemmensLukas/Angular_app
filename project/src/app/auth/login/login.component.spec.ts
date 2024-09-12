import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../environment/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AuthService} from "../../auth.service";
import {BackendService} from "../../backend.service";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FormsModule} from "@angular/forms";
import {async} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const userInfo = {
    email: 'somerealemail@somedomain.com',
    password: 'password'
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        FormsModule
      ],
      providers: [
        AuthService,
        BackendService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
