import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieComponent } from './add-movie.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environment/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {AuthService} from "../auth.service";
import {BackendService} from "../backend.service";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMovieComponent ],
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

    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Reactive form title validation positive', () => {
    let title = component.form.controls['title'];
    title.setValue("Avengers")
    expect(title.valid).toBeTruthy();
    expect(title.errors?.['required']).toBeUndefined();
  });

  it('Reactive form title validation negative', () => {
    let title = component.form.controls['title'];
    title.setValue(null);
    expect(title.valid).toBeFalse();
    expect(title.errors?.['required']).toBeTruthy();
    expect(component.form.valid).toBeFalse();
  });

  it('Reactive form rating validation positive', () => {
    let rating = component.form.controls['rating'];
    rating.setValue(4)
    expect(rating.valid).toBeTruthy();
  });

  it('Reactive form rating validation negative', () => {
    let rating = component.form.controls['rating'];
    rating.setValue(7)
    expect(rating.valid).toBeFalse();
    expect(rating.errors).toBeTruthy();
    expect(component.form.valid).toBeFalse();
  });

  it('Reactive form form validation negative', () => {
    let title = component.form.controls['title'];
    let author = component.form.controls['author'];
    let description = component.form.controls['description'];
    let genre = component.form.controls['genre'];
    let rating = component.form.controls['rating'];
    title.setValue("Avengers");
    author.setValue("Lukas");
    description.setValue("Test description");
    genre.setValue(null);
    rating.setValue(7);
    expect(component.form.valid).toBeFalse();
  });


});
