import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "../home/home.component";
import {MoviesComponent} from "../movies/movies.component";
import {AuthGuard} from "../auth.guard";
import {MovieDetailComponent} from "../movie-detail/movie-detail.component";
import {AddMovieComponent} from "../add-movie/add-movie.component";
import {AdminGuard} from "../admin.guard";
import {CanDeactivateGuardGuard} from "../can-deactivate-guard.guard";
import {ListComponent} from "../list/list.component";
import {LoginComponent} from "../auth/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {AddMovieModule} from "../add-movie/add-movie.module";

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard]},
  { path: 'movies/:id', component: MovieDetailComponent, canActivate:[AuthGuard]},
  { path:'addMovie', loadChildren: () => import('../add-movie/add-movie.module').then(m => m.AddMovieModule), canLoad:[AdminGuard]},
  { path: 'list', component: ListComponent, canActivate: [AdminGuard], children:[
      { path: ':id/edit', component: AddMovieComponent, canDeactivate: [CanDeactivateGuardGuard]},
    ]},
  {path: '**', component: LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
