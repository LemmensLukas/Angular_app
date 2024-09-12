import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import {AddMovieComponent} from "./add-movie.component";
import {AdminGuard} from "../admin.guard";
import {CanDeactivateGuardGuard} from "../can-deactivate-guard.guard";

const addMovieRoutes: Routes = [
  { path:'', component:AddMovieComponent, canActivate: [AdminGuard], canDeactivate: [CanDeactivateGuardGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(addMovieRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AddMovieRoutingModule { }
