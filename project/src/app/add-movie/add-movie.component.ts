import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Movie} from "../datatype/movie.model";
import {Observable} from "rxjs";
import {CanComponentDeactivate} from "../can-deactivate-guard.guard";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit, CanComponentDeactivate{
  form!: FormGroup;
  movie: Movie = new Movie();
  file: any;
  idFromRoute: string | null = null;
  saved: boolean = false;
  constructor(private backendService: BackendService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      'title':[null, {validators: Validators.required}],
      'author':[null, {validators: Validators.required}],
      'genre':[null, {validators: Validators.required}],
      'description':[null, {validators: Validators.required}],
      'img':[null, ],
      'rating':[null, {validators: Validators.required}],
      'bookmarked':[false, ],
      'releaseDate': [null],
    })

    this.route.paramMap.subscribe((params) => {
      this.idFromRoute = params.get('id')? params.get('id') : null;
      console.log(this.idFromRoute);

      if (this.idFromRoute){
        this.backendService.getMovie(this.idFromRoute).subscribe(movie => {
          this.movie = movie;
          console.log(this.movie);
          this.form.patchValue(this.movie);
          console.log('title: ' + this.movie.title);
        })
      }
    })
  }

  get title(){
    return this.form.controls['title'];
  }

  get author(){
    return this.form.controls['author'];
  }

  get description(){
    return this.form.controls['description'];
  }

  get genre(){
    return this.form.controls['genre'];
  }
  get rating(){
    return this.form.controls['rating'];
  }

  selectImg(event: Event){
    const target = event.target as HTMLInputElement;
    if(target.files && target.files[0]){
      this.file = target.files[0];
      console.log(this.file.name);
    }
  }

  async onSubmit(): Promise<void>{
    this.saved = true;
    const newMovie = {...this.form.value} as Movie;

    if(this.idFromRoute){
      const newId = this.backendService.createMovieID();
      if (this.file) {
        const path = 'movies/' + newId + '/' + this.file.name;
        newMovie.img = await this.backendService.uploadImg(path, this.file);
        console.log("test");
        console.log('img: ' + newMovie.img);
      }
      else{
        newMovie.img = this.movie.img;
      }
      console.log(this.idFromRoute);
      this.backendService.updateMovie(newMovie, this.idFromRoute)
      //await this.router.navigate(["/movies/"+this.idFromRoute]);
      await this.router.navigate(["/list"]);
    }
    else{
      this.backendService.addMovie(newMovie)
        .subscribe(
          ((movie) => {
            this.router.navigate(['/list']);
          })
        )
    }
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.saved){
        return confirm('Do u want to discard changes made?');
      }
    return true;
  }
  cancel(){
    this.router.navigate(['list']);
  }

}
