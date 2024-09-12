import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, CanDeactivateFn} from '@angular/router';
import { Observable } from 'rxjs';
export interface CanComponentDeactivate{
  canDeactivate: ()=> Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuardGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot):
                Observable<boolean> | Promise<boolean> | boolean {
   return component.canDeactivate();
  }
}
