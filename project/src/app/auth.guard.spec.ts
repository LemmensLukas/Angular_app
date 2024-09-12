import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "./environment/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {BackendService} from "./backend.service";
import {AuthService} from "./auth.service";

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports:[
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
      ],
      providers:[
        AuthService
      ]
    }).compileComponents();
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
