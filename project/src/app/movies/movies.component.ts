import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from "../datatype/movie.model";
import {Subscription} from "rxjs";
import {BackendService} from "../backend.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy{
  movies: Movie[] = [];
  bookmarked: Movie[] = [];
  movieSubscription !: Subscription;
  showBookmarked: boolean = false;
  p: number = 1;
  filterStatus = "";
  constructor(public backendService: BackendService, private auth_service: AuthService) {
  }

  ngOnInit(): void {
    this.movies = [];
    this.onGetMovies();
    this.onGetBookmarks();
  }

  onGetMovies() {
    this.movieSubscription = this.backendService.getMovies().subscribe(movies => {
      this.movies = movies;
    })
  }

  onGetBookmarks(){
    this.movieSubscription = this.backendService.getBookmarks().subscribe(movies => {
      this.bookmarked = movies;
    })
  }

  bookmark(movie: Movie){
    if(movie.bookmarked){
      movie.bookmarked = false;
      this.backendService.updateMovie(movie, movie.id)
    }
    else{
      movie.bookmarked = true;
      this.backendService.updateMovie(movie, movie.id)
    }
  }
  toggle(){
    this.showBookmarked = !this.showBookmarked;
  }
  search(searchValue: string){
    this.filterStatus = searchValue;
    /*this.backendService.searchMovie(searchValue).subscribe(res => {
      this.movies = res
      this.bookmarked = res;
    })*/
  }

  ngOnDestroy(): void {
    if(this.movieSubscription){
      this.movieSubscription.unsubscribe();
    }
  }

}
