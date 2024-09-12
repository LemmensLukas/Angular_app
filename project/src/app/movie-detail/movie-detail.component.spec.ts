import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import {BackendService} from "../backend.service";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environment/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AuthService} from "../auth.service";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import { FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';


describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailComponent ],
      imports:[
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthService,
        BackendService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
