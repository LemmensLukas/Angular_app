import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "./environment/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AuthService} from "./auth.service";
import {BackendService} from "./backend.service";
import {NavbarComponent} from "./navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {RouterLinkActive} from "@angular/router";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      imports:[
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        RouterOutlet,
        RouterLinkActive
      ],
      providers:[
        AuthService,
        BackendService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('project');
  });

});
