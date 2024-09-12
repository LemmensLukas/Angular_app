import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {map, Observable} from 'rxjs';
import {BackendService} from "./backend.service";
import {AuthService} from "./auth.service";
import {Admin} from "./datatype/admin.model";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private backend: BackendService, private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.authService.getUid())
    return this.backend.getAdmin(this.authService.getUid()).pipe(map((admin: Admin)=>{
      if(admin){
        return true;
      }
      else{
        return false;
      }

    }));
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.backend.getAdmin(this.authService.getUid()).pipe(map((admin: Admin)=>{
      if(admin){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }

}
