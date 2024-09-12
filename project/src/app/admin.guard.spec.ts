import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "./environment/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AuthService} from "./auth.service";

describe('AdminGuard', () => {
  let guard: AdminGuard;

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
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
