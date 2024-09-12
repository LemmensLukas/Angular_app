import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";

import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import { environment} from "./environment/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getStorage, provideStorage} from "@angular/fire/storage";
import { MoviesComponent } from './movies/movies.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToArrayPipe} from "./pipe/to-array.pipe";
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FilterPipe } from './pipe/filter.pipe';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {AuthModule} from "./auth/auth.module";
import {AddMovieModule} from "./add-movie/add-movie.module";
import { CursiveDirective } from './cursive.directive';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    NavbarComponent,
    SearchbarComponent,
    ToArrayPipe,
    AddMovieComponent,
    MovieDetailComponent,
    HomeComponent,
    ListComponent,
    FilterPipe,
    CursiveDirective,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    //AddMovieModule,
    AuthModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
