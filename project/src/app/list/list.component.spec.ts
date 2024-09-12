import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environment/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AuthService} from "../auth.service";
import {BackendService} from "../backend.service";
import { NgxPaginationModule } from 'ngx-pagination';
import {FilterPipe} from "../pipe/filter.pipe";
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent, FilterPipe ],
      imports:[
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        NgxPaginationModule,
        RouterModule,
        FormsModule
      ],
      providers: [
        AuthService,
        BackendService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
