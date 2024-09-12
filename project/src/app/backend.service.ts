import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  CollectionReference,
  query,
  where,
  addDoc, docData, doc, updateDoc, deleteDoc
} from "@angular/fire/firestore";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import {from, Observable} from "rxjs";
import {Movie} from "./datatype/movie.model";
import {DocumentReference} from "rxfire/firestore/interfaces";
import {Admin} from "./datatype/admin.model";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private db: Firestore, private storage: Storage, ) { }

  getMovies(): Observable<Movie[]>{
    return collectionData<Movie>(
      collection(this.db, 'movies') as CollectionReference<Movie>,
      {idField: 'id'}
    )
  }

  getBookmarks(): Observable<Movie[]>{
    return collectionData<Movie>(
      query<Movie>(
        collection(this.db, 'movies') as CollectionReference<Movie>,
        where("bookmarked", "==", true)
      )
    )
  }

  getMovie(id: string): Observable<Movie>{
    return docData<Movie>(
      doc(this.db, '/movies/' + id) as DocumentReference<Movie>
    )
  }

  addMovie(newMovie: Movie){
    const movieCollection = collection(this.db, '/movies');
    return from(addDoc(movieCollection, newMovie));
  }

  updateMovie(movie: Movie, id: string | undefined){
    const movieRef = doc(this.db, '/movies/' + id) as DocumentReference<Movie>;
    return from(updateDoc(movieRef, movie));
  }

  async uploadImg(path: string, file: File): Promise<string> {
    const storageRef = ref(this.storage, path);
    const task = uploadBytesResumable(storageRef, file);
    await task;
    const url = await getDownloadURL(storageRef);
    console.log(url);
    return url;
  }
  createMovieID(){
    return Math.random().toString(36).substring(2);
  }

  deleteMovie(id: string | null){
    const movieRef = doc(this.db, '/movies/' + id) as DocumentReference<Movie>;
    return from(deleteDoc(movieRef));
  }

  getAdmin(uid: string | undefined){
    return docData<Admin>(
      doc(this.db, '/administrators/' + uid) as DocumentReference<Admin>
    );
  }

  /*searchMovie(searchField: string): Observable<Movie[]>{
    return collectionData<Movie>(
      query<Movie>(
        collection(this.db, 'movies') as CollectionReference<Movie>,
        where("title", ">=", searchField),
        where("title", "<=", searchField + 'z')
      )
    )
  }*/

}
