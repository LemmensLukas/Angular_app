import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from "../datatype/movie.model";
import {Subscription} from "rxjs";
import {BackendService} from "../backend.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
  movies: Movie[] = [];
  movieSubscription !: Subscription;
  p: number = 1;
  id: string | null = null;
  filterStatus = "";

  constructor(public backendService: BackendService, private auth_service: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.onGetMovies()
  }
  onGetMovies() {
    this.movieSubscription = this.backendService.getMovies().subscribe(movies => {
      console.log(movies);
      this.movies = movies;
    })
  }
  deleteMovie(movie: Movie) {
    if(movie.id){
      this.id = movie.id
    }
    else {
      this.id = null;
    }
    if(confirm(`Are u sure u want to delete movie: ${movie.title}? Actions can't be undone!`)){
      this.backendService.deleteMovie(this.id);
      this.router.navigate(['list']);
    }
  }
  addMovie(){
    this.router.navigate(['addMovie']);
  }
  ngOnDestroy(): void {
    if(this.movieSubscription){
      this.movieSubscription.unsubscribe();
    }
  }

}
