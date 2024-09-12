import { TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "./environment/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "./auth.service";

describe('BackendService', () => {
  let service: BackendService;

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
        BackendService
      ]
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
