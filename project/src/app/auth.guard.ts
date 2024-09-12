import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanLoad, Route,
  Router,
  RouterStateSnapshot,

} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {BackendService} from "./backend.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router, private backend: BackendService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean  {
    if(this.authService.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}

