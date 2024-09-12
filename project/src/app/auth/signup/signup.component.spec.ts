import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../environment/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AuthService} from "../../auth.service";
import {BackendService} from "../../backend.service";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {ReactiveFormsModule} from "@angular/forms";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports:[
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        ReactiveFormsModule
      ],
      providers: [
        AuthService,
        BackendService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
