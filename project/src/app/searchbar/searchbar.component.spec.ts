import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environment/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AuthService} from "../auth.service";
import {BackendService} from "../backend.service";
import {FormsModule} from "@angular/forms";
import {Component, EventEmitter, Output} from '@angular/core';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarComponent ],
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

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
