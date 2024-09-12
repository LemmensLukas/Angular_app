import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environment/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AuthService} from "../auth.service";
import {BackendService} from "../backend.service";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {SearchbarComponent} from "../searchbar/searchbar.component";
import { NgxPaginationModule } from 'ngx-pagination';
import {RouterOutlet} from "@angular/router";
import {FilterPipe} from "../pipe/filter.pipe";
import {FormsModule} from "@angular/forms";

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesComponent, SearchbarComponent, FilterPipe ],
      imports:[
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        NgxPaginationModule,
        RouterOutlet,
        FormsModule
      ],
      providers: [
        AuthService,
        BackendService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
