import {Component, OnInit} from '@angular/core';
import {Movie} from "../datatype/movie.model";
import {BackendService} from "../backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent  implements OnInit{
  movie: Movie = new Movie();
  id: string = "";
  form!: FormGroup;
  idFromRoute: string | null = null;
  editable: boolean = false;
  saved: boolean = false;

  constructor(private backendService: BackendService, private router: Router,
              private route: ActivatedRoute, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.saved = false;
    this.form = this.fb.group({
      'title':[null],
      'author':[null],
      'genre':[null],
      'description':[null],
      'img':["", ],
      'rating':[null],
      'bookmarked':[false, ],
      'releaseDate': [null],
    })

    this.route.paramMap.subscribe((params) => {
      this.idFromRoute = params.get('id')? params.get('id') : null;
      if(this.idFromRoute) {
        this.backendService.getMovie(this.idFromRoute).subscribe(movie => {
          this.movie = movie;
          this.form.patchValue(this.movie);
        })
      }
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
}
